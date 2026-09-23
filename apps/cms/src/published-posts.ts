import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import type { Payload, PayloadHandler, Where } from "payload";
import { headersWithCors } from "payload";

/** Club home teasers use the same excerpt length. */
export const PUBLISHED_POST_EXCERPT_LENGTH = 180;
export const PUBLISHED_POSTS_DEFAULT_LIMIT = 20;
export const PUBLISHED_POSTS_MAX_LIMIT = 100;

/**
 * Public read constraint. `changed` means a published Post has a newer draft;
 * the live row is still the last published version and must stay in the list.
 * Never-published and unpublished Posts use `_status: draft`.
 */
export const publishedPostsWhere = {
	_status: {
		not_equals: "draft",
	},
} satisfies Where;

export type PublishedPostSource = {
	id: number | string;
	title?: string | null;
	excerpt?: string | null;
	slug?: string | null;
	url?: string | null;
	publishedAt?: string | null;
	body?: unknown;
};

/** Stable HTTP shape for Club BlogPost mapping. */
export type PublishedPostTeaser = {
	id: string;
	title: string;
	excerpt: string;
	slug: string;
	url: string;
	publishedAt: string;
};

export function parsePublishedPostsLimit(value: string | null | undefined) {
	if (value == null || value.trim() === "") {
		return PUBLISHED_POSTS_DEFAULT_LIMIT;
	}

	const parsed = Number(value);
	if (!Number.isInteger(parsed) || parsed < 1) {
		return PUBLISHED_POSTS_DEFAULT_LIMIT;
	}

	return Math.min(parsed, PUBLISHED_POSTS_MAX_LIMIT);
}

export function toPublishedPostTeaser(doc: PublishedPostSource): PublishedPostTeaser {
	const slug = doc.slug?.trim() ?? "";
	const explicitUrl = doc.url?.trim() ?? "";

	return {
		id: String(doc.id),
		title: normalizeWhitespace(doc.title ?? ""),
		excerpt: resolveExcerpt(doc.excerpt, doc.body),
		slug,
		url: explicitUrl || (slug ? `/${slug}` : ""),
		publishedAt: toIsoTimestamp(doc.publishedAt),
	};
}

export async function listPublishedPosts(
	payload: Payload,
	options?: { limit?: number },
): Promise<PublishedPostTeaser[]> {
	const result = await payload.find({
		collection: "posts",
		depth: 0,
		draft: false,
		limit: options?.limit ?? PUBLISHED_POSTS_DEFAULT_LIMIT,
		overrideAccess: false,
		sort: "-publishedAt",
		where: publishedPostsWhere,
	});

	return result.docs.map((doc) => toPublishedPostTeaser(doc));
}

export const publishedPostsHandler: PayloadHandler = async (req) => {
	const limit = parsePublishedPostsLimit(
		req.url ? new URL(req.url).searchParams.get("limit") : null,
	);
	const docs = await listPublishedPosts(req.payload, { limit });

	return Response.json(
		{ docs },
		{
			headers: headersWithCors({
				headers: new Headers(),
				req,
			}),
		},
	);
};

function resolveExcerpt(excerpt: string | null | undefined, body: unknown) {
	const explicit = normalizeWhitespace(excerpt ?? "");
	if (explicit) {
		return truncate(explicit);
	}

	return truncate(lexicalToPlainText(body));
}

function lexicalToPlainText(body: unknown) {
	if (!body || typeof body !== "object" || !("root" in body)) {
		return "";
	}

	try {
		return convertLexicalToPlaintext({
			data: body as Parameters<typeof convertLexicalToPlaintext>[0]["data"],
		});
	} catch {
		return "";
	}
}

function normalizeWhitespace(value: string) {
	return value.replace(/\s+/g, " ").trim();
}

function truncate(value: string, maxLength = PUBLISHED_POST_EXCERPT_LENGTH) {
	if (value.length <= maxLength) {
		return value;
	}

	return `${value.slice(0, maxLength).trimEnd()}…`;
}

function toIsoTimestamp(value: string | null | undefined) {
	if (!value) {
		return "";
	}

	const date = new Date(value);
	if (Number.isNaN(date.valueOf())) {
		return "";
	}

	return date.toISOString();
}
