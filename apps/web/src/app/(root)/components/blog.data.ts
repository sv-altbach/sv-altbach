import { cacheLife } from "next/cache";

const DEFAULT_TUMBLR_BLOG_API_URL =
	"https://svaltbach-blog.tumblr.com/api/read/json?num=5&start=0";
const FALLBACK_BLOG_POST_TITLE = "Tumblr-Beitrag";
const MAX_POSTS = 5;

export const TUMBLR_BLOG_URL = "https://www.tumblr.com/svaltbach-blog";

type TumblrReadApiPost = Record<string, unknown>;

type TumblrReadApiResponse = {
	posts?: TumblrReadApiPost[];
};

export type BlogPost = {
	id: string;
	title: string;
	excerpt: string;
	url: string;
	publishedAt: string;
};

function getTumblrBlogApiUrl() {
	return process.env.TUMBLR_BLOG_API_URL ?? DEFAULT_TUMBLR_BLOG_API_URL;
}

function normalizeWhitespace(value: string) {
	return value.replace(/\s+/g, " ").trim();
}

function decodeHtmlEntities(value: string) {
	return value.replace(
		/&(?:amp;|lt;|gt;|quot;|#39;|#\d+;|#x[\da-f]+;)/gi,
		(entity) => {
			const normalizedEntity = entity.toLowerCase();

			switch (normalizedEntity) {
				case "&amp;":
					return "&";
				case "&lt;":
					return "<";
				case "&gt;":
					return ">";
				case "&quot;":
					return '"';
				case "&#39;":
					return "'";
				default: {
					if (normalizedEntity.startsWith("&#x")) {
						const parsedCodePoint = Number.parseInt(
							normalizedEntity.slice(3, -1),
							16,
						);
						return Number.isNaN(parsedCodePoint)
							? entity
							: String.fromCodePoint(parsedCodePoint);
					}

					const parsedCodePoint = Number.parseInt(
						normalizedEntity.slice(2, -1),
						10,
					);
					return Number.isNaN(parsedCodePoint)
						? entity
						: String.fromCodePoint(parsedCodePoint);
				}
			}
		},
	);
}

function stripHtml(value: string) {
	return normalizeWhitespace(
		decodeHtmlEntities(
			value
				.replace(/<script[\s\S]*?<\/script[^>]*>/gi, " ")
				.replace(/<style[\s\S]*?<\/style[^>]*>/gi, " ")
				.replace(/<[^>]+>/g, " "),
		),
	);
}

function getFirstString(post: TumblrReadApiPost, keys: string[]) {
	for (const key of keys) {
		const value = post[key];
		if (typeof value === "string") {
			const normalizedValue = normalizeWhitespace(value);
			if (normalizedValue) {
				return normalizedValue;
			}
		}
	}
}

function truncate(value: string, maxLength = 180) {
	if (value.length <= maxLength) {
		return value;
	}

	return `${value.slice(0, maxLength).trimEnd()}…`;
}

function formatSlug(slug: string) {
	return slug
		.split("-")
		.filter(Boolean)
		.map(
			(segment) =>
				segment.charAt(0).toLocaleUpperCase("de-DE") + segment.slice(1),
		)
		.join(" ");
}

function resolveTitle(post: TumblrReadApiPost) {
	const title = getFirstString(post, [
		"regular-title",
		"link-text",
		"question",
		"quote-source",
	]);

	if (title) {
		return stripHtml(title);
	}

	const slug = getFirstString(post, ["slug"]);
	if (slug) {
		return formatSlug(slug);
	}

	return FALLBACK_BLOG_POST_TITLE;
}

function resolveExcerpt(post: TumblrReadApiPost, title: string) {
	const excerptSource = getFirstString(post, [
		"regular-body",
		"photo-caption",
		"link-description",
		"video-caption",
		"audio-caption",
		"answer",
		"quote-text",
		"conversation-text",
		"link-text",
	]);

	return truncate(stripHtml(excerptSource ?? title));
}

function resolvePublishedAt(post: TumblrReadApiPost) {
	const dateGmt = getFirstString(post, ["date-gmt", "date"]);
	if (dateGmt) {
		const publishedAt = new Date(dateGmt);
		if (!Number.isNaN(publishedAt.valueOf())) {
			return publishedAt.toISOString();
		}
	}

	const unixTimestamp = post["unix-timestamp"];
	if (typeof unixTimestamp === "number") {
		return new Date(unixTimestamp * 1_000).toISOString();
	}

	if (typeof unixTimestamp === "string") {
		const parsedUnixTimestamp = Number.parseInt(unixTimestamp, 10);
		if (!Number.isNaN(parsedUnixTimestamp)) {
			return new Date(parsedUnixTimestamp * 1_000).toISOString();
		}
	}

	return new Date(0).toISOString();
}

function resolveUrl(post: TumblrReadApiPost) {
	const url = getFirstString(post, ["url-with-slug", "url"]);
	return url ?? TUMBLR_BLOG_URL;
}

function parseTumblrReadApiResponse(payload: string): TumblrReadApiResponse {
	const normalizedPayload = payload
		.trim()
		.replace(/^var tumblr_api_read =\s*/, "")
		.replace(/;$/, "");

	return JSON.parse(normalizedPayload) as TumblrReadApiResponse;
}

function mapTumblrPosts(payload: TumblrReadApiResponse) {
	return (payload.posts ?? [])
		.map((post) => {
			const title = resolveTitle(post);
			const url = resolveUrl(post);

			return {
				id: String(post.id ?? url),
				title,
				excerpt: resolveExcerpt(post, title),
				url,
				publishedAt: resolvePublishedAt(post),
			} satisfies BlogPost;
		})
		.filter((post) => Boolean(post.url))
		.slice(0, MAX_POSTS);
}

export async function getLatestBlogPosts() {
	"use cache";

	cacheLife("weeks");

	try {
		const response = await fetch(getTumblrBlogApiUrl(), {
			headers: {
				accept: "application/json, text/javascript, */*;q=0.8",
			},
		});

		if (!response.ok) {
			throw new Error(
				`Tumblr feed request failed with status ${response.status}`,
			);
		}

		const payload = await response.text();
		return mapTumblrPosts(parseTumblrReadApiResponse(payload));
	} catch (error) {
		console.error("Failed to fetch Tumblr blog posts", error);
		return [];
	}
}
