import type { NextConfig } from "next";

export default {
	typedRoutes: true,
	reactCompiler: true,
	cacheComponents: true,
	experimental: {
		useTypeScriptCli: true,
	},
} satisfies NextConfig;
