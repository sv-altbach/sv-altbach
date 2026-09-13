import { defineConfig } from "oxfmt";

const tailwindFunctions = ["cn", "cva"];

export default defineConfig({
	useTabs: true,
	tabWidth: 4,
	ignorePatterns: [
		".agents/**",
		"skills-lock.json",
		"**/routeTree.gen.ts",
		"apps/cms/src/payload-types.ts",
		"apps/cms/src/app/importMap.js",
	],
	sortTailwindcss: {
		stylesheet: "./packages/ui/src/styles/globals.css",
		functions: tailwindFunctions,
	},
	overrides: [
		{
			files: ["apps/web/**"],
			options: {
				sortTailwindcss: {
					stylesheet: "./apps/web/src/styles.css",
					functions: tailwindFunctions,
				},
			},
		},
		{
			files: ["apps/masters/**"],
			options: {
				sortTailwindcss: {
					stylesheet: "./apps/masters/src/app/globals.css",
					functions: tailwindFunctions,
				},
			},
		},
	],
});
