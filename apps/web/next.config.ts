import type { NextConfig } from "next";

const escapeRegex = (value: string) =>
	value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const isDefined = (value: string | undefined): value is string => Boolean(value);

const DEPLOYMENT_DOMAINS = [
	process.env.VERCEL_URL,
	process.env.VERCEL_BRANCH_URL,
	process.env.VERCEL_PROJECT_PRODUCTION_URL,
]
	.filter(isDefined)
	.map(escapeRegex)
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
