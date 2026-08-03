import { appendFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// #region agent log
function debugLog(
	hypothesisId: string,
	location: string,
	message: string,
	data: Record<string, unknown>,
) {
	const payload = {
		sessionId: "a79e3a",
		runId: "post-fix",
		hypothesisId,
		location,
		message,
		data,
		timestamp: Date.now(),
	};
	fetch("http://127.0.0.1:7320/ingest/7cddc910-6b92-4036-9bd4-9fbb6a40b8fc", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Debug-Session-Id": "a79e3a",
		},
		body: JSON.stringify(payload),
	}).catch(() => {});
	try {
		appendFileSync(
			join(process.cwd(), "../../debug-a79e3a.log"),
			`${JSON.stringify(payload)}\n`,
		);
	} catch {
		/* ignore */
	}
}
// #endregion

/**
 * Rolldown leaves CJS `use-sync-external-store/shim` as `__require("react")`
 * (createRequire) in SSR chunks. On Vercel that fails because the function has
 * no node_modules. When the same chunk already inlines React as `require_react`,
 * rewrite the bare require to use it. Avoids Nitro `traceDeps`, which breaks
 * Vercel Build Output API detection for this project.
 */
function patchBareReactRequires(serverRoot: string) {
	const requireReactRe = /__require\(["']react["']\)/g;
	const patched: Array<{ file: string; before: number; after: number }> = [];
	const skipped: string[] = [];

	function walk(dir: string) {
		if (!existsSync(dir)) return;
		for (const entry of readdirSync(dir, { withFileTypes: true })) {
			const path = join(dir, entry.name);
			if (entry.isDirectory()) {
				if (entry.name === "node_modules") continue;
				walk(path);
				continue;
			}
			if (!entry.name.endsWith(".mjs") && !entry.name.endsWith(".js")) continue;
			const src = readFileSync(path, "utf8");
			const before = (src.match(requireReactRe) ?? []).length;
			if (before === 0) continue;
			if (!/\brequire_react\b/.test(src)) {
				skipped.push(path.replace(serverRoot, "."));
				continue;
			}
			const next = src
				.replaceAll('__require("react")', "require_react()")
				.replaceAll("__require('react')", "require_react()");
			const after = (next.match(requireReactRe) ?? []).length;
			writeFileSync(path, next);
			patched.push({
				file: path.replace(serverRoot, "."),
				before,
				after,
			});
		}
	}

	walk(serverRoot);
	return { patched, skipped };
}

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		dedupe: ["react", "react-dom"],
		tsconfigPaths: true,
	},
	plugins: [
		devtools(),
		tailwindcss(),
		tanstackStart(),
		nitro({
			hooks: {
				compiled(nitro) {
					const serverRoot = nitro.options.output.serverDir;
					const result = patchBareReactRequires(serverRoot);
					// #region agent log
					debugLog(
						"E",
						"vite.config.ts:compiled",
						"patched bare react requires in SSR output",
						{
							serverRoot,
							...result,
							reactTraced: existsSync(join(serverRoot, "node_modules/react")),
						},
					);
					// #endregion
				},
			},
		}),
		viteReact(),
		babel({
			presets: [reactCompilerPreset()],
		}),
	],
});
