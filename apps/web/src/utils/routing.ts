import type { Route } from "next";

const SUB_ROUTE_RE = /^\/sub\/([^/]+)(\/.*)?$/;
const ROOT_ROUTE_RE = /^\/root(\/.*)?$/;

function getRootDomain(): { domain: string; port: string; protocol: string } {
	if (typeof window !== "undefined") {
		const { hostname, port, protocol } = window.location;
		const isLocal = hostname === "localhost" || hostname.endsWith(".localhost");
		const domain = isLocal
			? "localhost"
			: hostname.split(".").slice(-2).join(".");
		return { domain, port, protocol: protocol.replace(":", "") };
	}

	// Server-side: mirror next.config.ts — VERCEL_ENV presence means we're on Vercel.
	// ROOT_DOMAIN there is a regex pattern (url1|url2|url3); here we pick a single domain
	// in the same priority order: production custom domain → branch URL → deployment URL.
	if (process.env.VERCEL_ENV) {
		const domain =
			process.env.VERCEL_PROJECT_PRODUCTION_URL ??
			process.env.VERCEL_BRANCH_URL ??
			process.env.VERCEL_URL ??
			"localhost";
		return { domain, port: "", protocol: "https" };
	}

	return {
		domain: "localhost",
		port: process.env.PORT ?? "3000",
		protocol: "http",
	};
}

/**
 * Converts a route into the correct absolute URL for cross-subdomain navigation
 * with next/link. Handles two patterns:
 *
 * - /sub/:subdomain/:path* — routes to that subdomain
 * - /root/:path*           — routes to the root domain (no subdomain prefix)
 *
 * All other routes are returned unchanged.
 *
 * @example
 * // on localhost:3000
 * subdomainHref("/sub/masters/scoreboard") // → "http://masters.localhost:3000/scoreboard"
 * subdomainHref("/sub/root/impressum")     // → "http://localhost:3000/impressum"
 * subdomainHref("/root/mannschaften")      // → "http://localhost:3000/mannschaften"
 * subdomainHref("/other/page")             // → "/other/page"  (unchanged)
 */
export function subdomainHref(route: Route): Route {
	const { domain, port, protocol } = getRootDomain();
	const portSuffix = port ? `:${port}` : "";

	const subMatch = route.match(SUB_ROUTE_RE);
	if (subMatch) {
		const [, subdomain, path = "/"] = subMatch;
		const host = subdomain === "root" ? domain : `${subdomain}.${domain}`;
		return `${protocol}://${host}${portSuffix}${path}` as Route;
	}

	const rootMatch = route.match(ROOT_ROUTE_RE);
	if (rootMatch) {
		const [, path = "/"] = rootMatch;
		return `${protocol}://${domain}${portSuffix}${path}` as Route;
	}

	return route as Route;
}
