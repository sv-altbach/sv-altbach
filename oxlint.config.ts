import { defineConfig } from "oxlint";

const ignorePatterns = [".agents/**", "**/routeTree.gen.ts", "apps/cms/src/payload-types.ts"];

const basePlugins = [
	"eslint",
	"typescript",
	"unicorn",
	"oxc",
	"react",
	"jsx-a11y",
	"import",
] as const;

export default defineConfig({
	ignorePatterns,
	plugins: [...basePlugins],
	jsPlugins: ["oxlint-tailwindcss"],
	settings: {
		next: {
			rootDir: ["apps/masters/", "apps/cms/"],
		},
		react: {
			version: "19.2.8",
			linkComponents: [{ name: "Link", attributes: ["to", "href"] }],
		},
		"jsx-a11y": {
			components: {
				Link: "a",
			},
			attributes: {
				href: ["href", "to"],
			},
		},
		tailwindcss: {
			entryPoint: [
				{ files: "apps/web/**", use: "apps/web/src/styles.css" },
				{ files: "apps/masters/**", use: "apps/masters/src/app/globals.css" },
				{ files: "**", use: "packages/ui/src/styles/globals.css" },
			],
		},
	},
	rules: {
		"react/no-array-index-key": "off",
		"tailwindcss/no-unknown-classes": "warn",
		"tailwindcss/no-duplicate-classes": "warn",
		"tailwindcss/no-conflicting-classes": "warn",
		"tailwindcss/no-deprecated-classes": "warn",
		"tailwindcss/no-unnecessary-whitespace": "warn",
	},
	overrides: [
		{
			files: ["apps/masters/**/*.{js,jsx,ts,tsx}", "apps/cms/**/*.{js,jsx,ts,tsx}"],
			plugins: [...basePlugins, "nextjs"],
		},
	],
});
