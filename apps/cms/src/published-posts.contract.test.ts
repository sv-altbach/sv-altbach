import { describe, expect, test } from "vitest";

import {
	PUBLISHED_POSTS_DEFAULT_LIMIT,
	PUBLISHED_POSTS_MAX_LIMIT,
	parsePublishedPostsLimit,
	publishedPostsWhere,
	toPublishedPostTeaser,
} from "./published-posts";

const lexicalBody = (text: string) => ({
	root: {
		type: "root",
		children: [
			{
				type: "paragraph",
				children: [{ type: "text", text, version: 1 }],
				direction: "ltr",
				format: "",
				indent: 0,
				version: 1,
			},
		],
		direction: "ltr",
		format: "",
		indent: 0,
		version: 1,
	},
});

describe("published post teaser mapping", () => {
	test("maps Club-needed fields and keeps an explicit url", () => {
		expect(
			toPublishedPostTeaser({
				id: 12,
				title: "Sommerfest",
				excerpt: "Der Verein lädt ein.",
				slug: "sommerfest",
				url: "https://www.tumblr.com/svaltbach-blog/123",
				publishedAt: "2024-06-01T15:30:00.000Z",
				body: lexicalBody("This body must not replace the excerpt."),
			}),
		).toEqual({
			id: "12",
			title: "Sommerfest",
			excerpt: "Der Verein lädt ein.",
			slug: "sommerfest",
			url: "https://www.tumblr.com/svaltbach-blog/123",
			publishedAt: "2024-06-01T15:30:00.000Z",
		});
	});

	test("uses /{slug} when no public url is set", () => {
		expect(
			toPublishedPostTeaser({
				id: "9",
				title: "Training",
				excerpt: "Zeiten",
				slug: "training",
				url: "  ",
				publishedAt: "2024-01-02T00:00:00.000Z",
			}).url,
		).toBe("/training");
	});

	test("derives a truncated excerpt from the body when excerpt is blank", () => {
		const text = "Wort ".repeat(50);

		expect(
			toPublishedPostTeaser({
				id: 1,
				title: "Lang",
				excerpt: "   ",
				slug: "lang",
				publishedAt: "2024-01-02T00:00:00.000Z",
				body: lexicalBody(text),
			}).excerpt,
		).toBe(`${"Wort ".repeat(36).trimEnd()}…`);
	});
});

describe("published-posts query contract", () => {
	test("excludes drafts while keeping published and changed posts", () => {
		expect(publishedPostsWhere).toEqual({
			_status: { not_equals: "draft" },
		});
	});

	test("parses limit with a default and a max", () => {
		expect(parsePublishedPostsLimit(null)).toBe(PUBLISHED_POSTS_DEFAULT_LIMIT);
		expect(parsePublishedPostsLimit("3")).toBe(3);
		expect(parsePublishedPostsLimit("0")).toBe(PUBLISHED_POSTS_DEFAULT_LIMIT);
		expect(parsePublishedPostsLimit("nope")).toBe(PUBLISHED_POSTS_DEFAULT_LIMIT);
		expect(parsePublishedPostsLimit(String(PUBLISHED_POSTS_MAX_LIMIT + 25))).toBe(
			PUBLISHED_POSTS_MAX_LIMIT,
		);
	});
});
