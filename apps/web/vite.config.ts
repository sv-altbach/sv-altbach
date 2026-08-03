import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	// TODO: remove this once the issue is fixed
	optimizeDeps: {
		include: [
			"@base-ui/react > use-sync-external-store/shim/with-selector",
			"@tanstack/react-hotkeys > use-sync-external-store/shim/with-selector",
			"@tanstack/react-router > @tanstack/react-store > use-sync-external-store/shim/with-selector",
		],
	},
	plugins: [
		devtools(),
		tailwindcss(),
		tanstackStart(),
		nitro(),
		viteReact(),
		babel({
			presets: [reactCompilerPreset()],
		}),
	],
});
