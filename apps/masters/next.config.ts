import type { NextConfig } from "next";

export default {
	typedRoutes: true,
	reactCompiler: true,
	cacheComponents: true,
	transpilePackages: ["@sv-altbach/ui"],
} satisfies NextConfig;
