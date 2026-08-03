import { appendFileSync, existsSync, readdirSync, readFileSync } from "node:fs";
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

function probeVercelFuncOutput() {
	const funcRoot = join(
		process.cwd(),
		".vercel/output/functions/__server.func",
	);
	if (!existsSync(funcRoot)) {
		debugLog("A", "vite.config.ts:probe", "no vercel func output", {
			funcRoot,
		});
		return;
	}
	const ssrDir = join(funcRoot, "_ssr");
	const routerFiles = existsSync(ssrDir)
		? readdirSync(ssrDir).filter((f) => f.startsWith("router-"))
		: [];
	const requireReactHits: Array<{ file: string; count: number }> = [];
	for (const file of routerFiles) {
		const src = readFileSync(join(ssrDir, file), "utf8");
		const count = (src.match(/__require\(["']react["']\)/g) ?? []).length;
		requireReactHits.push({ file, count });
	}
	debugLog("A", "vite.config.ts:probe", "vercel SSR react resolution probe", {
		routerFiles,
		requireReactHits,
		reactTraced: existsSync(join(funcRoot, "node_modules/react")),
		reactDomTraced: existsSync(join(funcRoot, "node_modules/react-dom")),
		funcEntries: readdirSync(funcRoot),
	});
}
// #endregion

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
			// Base UI (via Dialog) pulls use-sync-external-store/shim, which emits
			// createRequire("react") in the SSR chunk. Vercel functions have no
			// node_modules unless Nitro traces these deps into the output.
			traceDeps: ["react", "react-dom"],
			// #region agent log
			hooks: {
				compiled() {
					probeVercelFuncOutput();
				},
			},
			// #endregion
		}),
		viteReact(),
		babel({
			presets: [reactCompilerPreset()],
		}),
	],
});
