import Link from "next/link";
import type { ComponentProps } from "react";
import {
	buildSubdomainHref,
	type OriginInfo,
	resolveOriginInfo,
	type Subdomain,
} from "@/utils/routing";

type SubdomainLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
	href: string;
	subdomain?: Subdomain;
	origin?: OriginInfo;
};

export function SubdomainLink({
	href,
	subdomain = "root",
	origin,
	prefetch,
	...props
}: SubdomainLinkProps) {
	const finalHref = buildSubdomainHref(href, {
		subdomain,
		origin: origin ?? resolveOriginInfo(),
	});

	const isCrossSubdomain =
		typeof finalHref === "string" &&
		(finalHref.startsWith("http://") || finalHref.startsWith("https://"));

	return (
		<Link
			href={finalHref as ComponentProps<typeof Link>["href"]}
			prefetch={isCrossSubdomain ? false : prefetch}
			{...props}
		/>
	);
}
