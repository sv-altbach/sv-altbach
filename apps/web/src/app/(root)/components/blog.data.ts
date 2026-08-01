import { cacheLife } from "next/cache";

const DEFAULT_TUMBLR_BLOG_FEED_URL = "https://svaltbach-blog.tumblr.com/rss";
const FALLBACK_BLOG_POST_TITLE = "Tumblr-Beitrag";
const MAX_POSTS = 5;

export const TUMBLR_BLOG_URL = "https://www.tumblr.com/svaltbach-blog";

type TumblrRssItem = {
	title: string;
	description: string;
	link: string;
	guid: string;
	pubDate: string;
};

export type BlogPost = {
	id: string;
	title: string;
	excerpt: string;
	url: string;
	publishedAt: string;
};

function getTumblrBlogFeedUrl() {
	return process.env.TUMBLR_BLOG_FEED_URL ?? DEFAULT_TUMBLR_BLOG_FEED_URL;
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

function truncate(value: string, maxLength = 180) {
	if (value.length <= maxLength) {
		return value;
	}

	return `${value.slice(0, maxLength).trimEnd()}…`;
}

function extractRssTagValue(block: string, tag: string) {
	const match = block.match(
		new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i"),
	);

	return match?.[1]?.trim();
}

function parseTumblrRssFeed(payload: string): TumblrRssItem[] {
	const items: TumblrRssItem[] = [];

	for (const match of payload.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
		const block = match[1] ?? "";
		const title = extractRssTagValue(block, "title");
		const link = extractRssTagValue(block, "link");
		const guid = extractRssTagValue(block, "guid");
		const pubDate = extractRssTagValue(block, "pubDate");
		const description = extractRssTagValue(block, "description");

		if (!title || !link || !pubDate) {
			continue;
		}

		items.push({
			title,
			description: description ?? title,
			link,
			guid: guid ?? link,
			pubDate,
		});
	}

	return items;
}

function resolvePublishedAt(pubDate: string) {
	const publishedAt = new Date(pubDate);
	if (!Number.isNaN(publishedAt.valueOf())) {
		return publishedAt.toISOString();
	}

	return new Date(0).toISOString();
}

function mapTumblrRssItems(items: TumblrRssItem[]) {
	return items
		.map((item) => {
			const title = stripHtml(item.title) || FALLBACK_BLOG_POST_TITLE;
			const url = item.link || TUMBLR_BLOG_URL;

			return {
				id: item.guid || url,
				title,
				excerpt: truncate(stripHtml(item.description || title)),
				url,
				publishedAt: resolvePublishedAt(item.pubDate),
			} satisfies BlogPost;
		})
		.filter((post) => Boolean(post.url))
		.slice(0, MAX_POSTS);
}

export async function getLatestBlogPosts() {
	"use cache";
	cacheLife("weeks");

	try {
		const response = await fetch(getTumblrBlogFeedUrl(), {
			headers: {
				accept: "application/rss+xml, application/xml, text/xml, */*;q=0.8",
			},
		});

		if (!response.ok) {
			throw new Error(
				`Tumblr feed request failed with status ${response.status}`,
			);
		}

		const payload = await response.text();
		return mapTumblrRssItems(parseTumblrRssFeed(payload));
	} catch (error) {
		console.error("Failed to fetch Tumblr blog posts", error);
		return [];
	}
}
