import type { NextConfig } from "next";

export default {
	typedRoutes: true,
	reactCompiler: true,
	cacheComponents: true,
	experimental: {
		// TypeScript 7 lacks the JS compiler API Next uses by default.
		useTypeScriptCli: true,
	},
} satisfies NextConfig;
