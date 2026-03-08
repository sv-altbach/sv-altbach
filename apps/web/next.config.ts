import type { NextConfig } from "next";

const DEPLOYMENT_DOMAINS = [
	process.env.VERCEL_URL,
	process.env.VERCEL_BRANCH_URL,
	process.env.VERCEL_PROJECT_PRODUCTION_URL,
]
	.filter((domain) => domain !== undefined)
	.map((domain) => RegExp.escape(domain))
	.join("|");

const ROOT_DOMAIN = process.env.VERCEL_ENV
	? `(${DEPLOYMENT_DOMAINS})`
	: "localhost";

const REWRITE_SOURCE_PATTERN =
	"/:path((?!_next|_vercel|.well-known|.*\\.\\w+$).*)*";

export default {
	typedRoutes: true,
	reactCompiler: true,

	rewrites: () => ({
		beforeFiles: [
			// * route subdomain requests to /sub/:subdomain/:path*
			{
				source: REWRITE_SOURCE_PATTERN,
				has: [{ type: "host", value: `(?<subdomain>[^.]+)\\.${ROOT_DOMAIN}` }],
				destination: "/sub/:subdomain/:path*",
			},
			// * route root domain requests to /root/:path*
			{
				source: REWRITE_SOURCE_PATTERN,
				has: [{ type: "host", value: ROOT_DOMAIN }],
				destination: "/root/:path*",
			},
		],
	}),
} satisfies NextConfig;
