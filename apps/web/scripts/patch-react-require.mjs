/**
 * Workaround for https://github.com/nitrojs/nitro/issues/4171
 *
 * Vite's SSR build lowers `require("react")` inside vendored CommonJS (the
 * `use-sync-external-store` shim pulled in via @tanstack/react-store) to a
 * runtime `__require("react")` (`createRequire`). Nitro bundles React into the
 * output, so at runtime that require either finds no `react` at all (Vercel /
 * Docker, where node_modules is not shipped) or loads a second React instance
 * with a null dispatcher.
 *
 * The affected chunks already reference the bundled React initializer
 * (`require_react`), so we rewrite the leaked `__require("react")` calls to it
 * post-build. Remove once the fix for the issue above lands in a Nitro release
 * (see experimental `cjsRequireRewrite` in nitro PR #4365).
 */

import { existsSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// `\b` does not match between word chars, so `require_react` will not match
// inside `require_react_dom`.
const REWRITES = [
	{
		leak: /__require\((["'])react\1\)/g,
		initializer: /\brequire_react(?:\$\d+)?\b/,
	},
	{
		leak: /__require\((["'])react-dom\1\)/g,
		initializer: /\brequire_react_dom(?:\$\d+)?\b/,
	},
];
const ANY_REACT_LEAK = /__require\((["'])(react(?:-dom)?(?:\/[\w./-]+)?)\1\)/g;

const OUTPUT_DIRS = [
	".output/server", // node-server preset (local builds)
	".vercel/output/functions", // vercel preset (production)
];

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(path);
		else if (entry.name.endsWith(".mjs")) yield path;
	}
}

let patchedFiles = 0;
const unresolved = [];

for (const dir of OUTPUT_DIRS) {
	if (!existsSync(dir)) continue;
	for await (const file of walk(dir)) {
		let content = await readFile(file, "utf-8");
		if (!content.includes("__require(")) continue;

		let changed = false;
		for (const { leak, initializer } of REWRITES) {
			const match = content.match(initializer);
			if (!match) continue;
			const rewritten = content.replace(leak, `${match[0]}()`);
			if (rewritten !== content) {
				content = rewritten;
				changed = true;
			}
		}
		if (changed) {
			await writeFile(file, content, "utf-8");
			patchedFiles++;
			console.log(`[patch-react-require] patched ${file}`);
		}

		for (const [, , specifier] of content.matchAll(ANY_REACT_LEAK)) {
			unresolved.push(`${file}: __require("${specifier}")`);
		}
	}
}

if (unresolved.length > 0) {
	console.error(
		"[patch-react-require] leaked React requires without a bundled initializer in the same chunk — the deployment would fail at runtime:",
	);
	for (const leak of unresolved) console.error(`  ${leak}`);
	process.exit(1);
}

console.log(
	patchedFiles > 0
		? `[patch-react-require] done (${patchedFiles} file(s) patched)`
		: "[patch-react-require] no leaked React requires found, nothing to patch",
);
