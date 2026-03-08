const SUB_ROUTE_RE = /^\/sub\/([^/]+)(\/.*)?$/;

export type OriginInfo = {
	protocol: "http" | "https";
	domain: string;
	port?: string;
	currentSubdomain?: Subdomain;
};

const SUBDOMAINS = ["root", "masters"] as const;
export type Subdomain = (typeof SUBDOMAINS)[number];

function isSubdomain(value: string): value is Subdomain {
	return SUBDOMAINS.includes(value as Subdomain);
}

function getRootDomain(hostname: string): string {
	const isLocal = hostname === "localhost" || hostname.endsWith(".localhost");
	return isLocal ? "localhost" : hostname.split(".").slice(-2).join(".");
}

function getCurrentSubdomain(
	hostname: string,
	domain: string,
): Subdomain | undefined {
	if (hostname === domain) return "root";

	const suffix = `.${domain}`;
	if (!hostname.endsWith(suffix)) return undefined;

	const candidate = hostname.slice(0, -suffix.length);
	return isSubdomain(candidate) ? candidate : undefined;
}

export function resolveOriginInfo(): OriginInfo {
	if (typeof window !== "undefined") {
		const { hostname, port, protocol } = window.location;
		const domain = getRootDomain(hostname);
		return {
			domain,
			port: port || undefined,
			protocol: protocol.replace(":", "") as OriginInfo["protocol"],
			currentSubdomain: getCurrentSubdomain(hostname, domain),
		};
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
		return { domain, protocol: "https" };
	}

	return {
		domain: "localhost",
		port: process.env.PORT ?? "3000",
		protocol: "http",
	};
}

export function parseInternalSubdomainRoute(
	route: string,
): { subdomain: Subdomain; path: string } | null {
	const subMatch = route.match(SUB_ROUTE_RE);
	if (subMatch) {
		const [, rawSubdomain, path = "/"] = subMatch;
		if (!rawSubdomain || !isSubdomain(rawSubdomain)) {
			return null;
		}

		return { subdomain: rawSubdomain, path };
	}

	// New pathless root-group structure rewrites root domain requests to `/:path*`.
	// Keep compatibility with legacy `/root/...` routes.
	if (!route.startsWith("/sub/")) {
		if (route === "/root") {
			return { subdomain: "root", path: "/" };
		}

		if (route.startsWith("/root/")) {
			return { subdomain: "root", path: route.slice("/root".length) };
		}

		return { subdomain: "root", path: route || "/" };
	}

	return null;
}

/**
 * Resolves a public path to either a same-origin relative href or a
 * cross-subdomain absolute URL.
 *
 * @example
 * // on localhost:3000
 * buildSubdomainHref("/mannschaften", {
 *   subdomain: "root",
 *   origin: resolveOriginInfo(),
 * })
 * // -> "/mannschaften"
 *
 * buildSubdomainHref("/scoreboard", {
 *   subdomain: "masters",
 *   origin: resolveOriginInfo(),
 * })
 * // -> "http://masters.localhost:3000/scoreboard"
 */
export function buildSubdomainHref<Pathname extends string>(
	href: Pathname,
	opts: {
		subdomain?: Subdomain;
		origin: OriginInfo;
	},
): Pathname | string {
	const targetSubdomain = opts.subdomain ?? "root";
	const currentSubdomain = opts.origin.currentSubdomain ?? "root";

	if (targetSubdomain === currentSubdomain) return href;

	const host =
		targetSubdomain === "root"
			? opts.origin.domain
			: `${targetSubdomain}.${opts.origin.domain}`;

	const port = opts.origin.port ? `:${opts.origin.port}` : "";

	return `${opts.origin.protocol}://${host}${port}${href}`;
}

/**
 * Adapter for internal root (`/...`) and subdomain (`/sub/...`) routes.
 * Legacy `/root/...` routes are still supported.
 */
export function subdomainHrefFromInternalRoute(
	route: string,
	origin: OriginInfo,
): string {
	const target = parseInternalSubdomainRoute(route);

	return target
		? buildSubdomainHref(target.path, {
				subdomain: target.subdomain,
				origin,
			})
		: route;
}
