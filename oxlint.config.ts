import { defineConfig } from "oxlint";

const BASE_PLUGINS = [
	"eslint",
	"typescript",
	"unicorn",
	"oxc",
	"react",
	"jsx-a11y",
	"import",
] as const;

export default defineConfig({
	ignorePatterns: [".agents/**", "**/routeTree.gen.ts", "apps/cms/src/payload-types.ts"],
	plugins: [...BASE_PLUGINS],
	jsPlugins: ["oxlint-tailwindcss", "@shadcn/lint"],
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
		"shadcn/no-restyle": ["error", { allow: ["layout"] }],
		"shadcn/no-raw-colors": "error",
		"shadcn/no-arbitrary-values": ["error", { allow: ["layout"] }],
		"shadcn/no-inline-styles": "error",
		"shadcn/require-static-classes": "error",
	},
	overrides: [
		{
			files: ["apps/masters/**/*.{js,jsx,ts,tsx}", "apps/cms/**/*.{js,jsx,ts,tsx}"],
			plugins: [...BASE_PLUGINS, "nextjs"],
		},
		{
			files: ["packages/ui/src/components/**"],
			rules: {
				"shadcn/no-restyle": "off",
				"shadcn/no-arbitrary-values": "off",
				"shadcn/require-static-classes": "off",
			},
		},
		{
			files: ["apps/web/emails/**"],
			rules: {
				"shadcn/no-raw-colors": "off",
			},
		},
	],
});
