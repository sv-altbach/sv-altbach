import path from "node:path";
import { fileURLToPath } from "node:url";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
	typedRoutes: true,
	allowedDevOrigins: ["127.0.0.1", "localhost"],
	images: {
		localPatterns: [
			{
				pathname: "/api/media/file/**",
			},
		],
	},
	webpack: (webpackConfig) => {
		webpackConfig.resolve.extensionAlias = {
			".cjs": [".cts", ".cjs"],
			".js": [".ts", ".tsx", ".js", ".jsx"],
			".mjs": [".mts", ".mjs"],
		};

		return webpackConfig;
	},
	// Monorepo: point Turbopack at the workspace root so `next` resolves.
	turbopack: {
		root: path.resolve(dirname, "../.."),
	},
} satisfies NextConfig;

export default withPayload(nextConfig, { devBundleServerPackages: false });
