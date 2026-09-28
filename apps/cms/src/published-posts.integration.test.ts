import { getPayload, handleEndpoints, type Payload } from "payload";
import { afterAll, beforeAll, beforeEach, describe, expect, test } from "vitest";

import type { Post } from "./payload-types";
import { listPublishedPosts } from "./published-posts";

function lexicalBody(text: string): NonNullable<Post["body"]> {
	return {
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
	};
}

/** Slug is required on the create type; an empty value is generated from the title. */
function publishedPost(data: {
	title: string;
	excerpt?: string;
	url?: string;
	publishedAt?: string;
	body?: Post["body"];
	image?: number;
}) {
	return {
		...data,
		slug: "",
		_status: "published" as const,
	};
}

const PNG = Buffer.from(
	"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
	"base64",
);

describe("published-posts HTTP contract", () => {
	let payload: Payload;

	beforeAll(async () => {
		const { default: config } = await import("./payload.config");
		payload = await getPayload({ config });
	});

	beforeEach(async () => {
		await payload.delete({
			collection: "posts",
			overrideAccess: true,
			where: { id: { exists: true } },
		});
	});

	afterAll(async () => {
		if (payload) {
			await payload.destroy();
		}
	});

	test("returns only published Posts, newest first, with Club-mappable fields", async () => {
		await payload.create({
			collection: "posts",
			draft: false,
			data: publishedPost({
				title: "Older news",
				excerpt: "First",
				publishedAt: "2020-01-01T00:00:00.000Z",
			}),
		});
		await payload.create({
			collection: "posts",
			data: {
				title: "Hidden draft",
				excerpt: "Do not show",
				_status: "draft",
			},
			draft: true,
		});
		await payload.create({
			collection: "posts",
			draft: false,
			data: publishedPost({
				title: "Newer news",
				excerpt: "Second",
				url: "https://example.com/newer",
				publishedAt: "2024-06-01T00:00:00.000Z",
			}),
		});

		const docs = await listPublishedPosts(payload, { limit: 10 });

		expect(docs.map((doc) => doc.title)).toEqual(["Newer news", "Older news"]);
		expect(docs[0]).toEqual({
			id: expect.any(String),
			title: "Newer news",
			excerpt: "Second",
			slug: "newer-news",
			url: "https://example.com/newer",
			publishedAt: "2024-06-01T00:00:00.000Z",
		});
		expect(docs[1]?.url).toBe("/older-news");
	});

	test("keeps the last published version when a newer draft exists", async () => {
		const published = await payload.create({
			collection: "posts",
			draft: false,
			data: publishedPost({
				title: "Live title",
				excerpt: "Live excerpt",
				publishedAt: "2024-03-01T00:00:00.000Z",
			}),
		});

		await payload.update({
			collection: "posts",
			id: published.id,
			data: {
				title: "Draft title",
				excerpt: "Draft excerpt",
			},
			draft: true,
		});

		const docs = await listPublishedPosts(payload);
		expect(docs).toHaveLength(1);
		expect(docs[0]?.title).toBe("Live title");
		expect(docs[0]?.excerpt).toBe("Live excerpt");
	});

	test("drops a Post from the public list after it is unpublished", async () => {
		const published = await payload.create({
			collection: "posts",
			draft: false,
			data: publishedPost({
				title: "Will unpublish",
				excerpt: "Visible",
				publishedAt: "2024-04-01T00:00:00.000Z",
			}),
		});

		expect(await listPublishedPosts(payload)).toHaveLength(1);

		await payload.update({
			collection: "posts",
			id: published.id,
			data: {
				_status: "draft",
			},
		});

		expect(await listPublishedPosts(payload)).toEqual([]);
	});

	test("derives excerpt from the stored body and accepts a media upload", async () => {
		const media = await payload.create({
			collection: "media",
			data: { alt: "Club photo" },
			file: {
				data: PNG,
				mimetype: "image/png",
				name: "dot.png",
				size: PNG.length,
			},
		});

		await payload.create({
			collection: "posts",
			draft: false,
			data: publishedPost({
				title: "With image",
				body: lexicalBody("Hello from the body of the post."),
				image: media.id,
				publishedAt: "2024-05-01T00:00:00.000Z",
			}),
		});

		const docs = await listPublishedPosts(payload);
		expect(docs[0]?.excerpt).toBe("Hello from the body of the post.");
		expect(docs[0]?.slug).toBe("with-image");
	});

	test("sets publishedAt when a Post is published without one", async () => {
		const before = Date.now();

		await payload.create({
			collection: "posts",
			draft: false,
			data: publishedPost({
				title: "Auto date",
				excerpt: "Dated",
			}),
		});

		const docs = await listPublishedPosts(payload);
		const publishedAt = Date.parse(docs[0]?.publishedAt ?? "");

		expect(Number.isNaN(publishedAt)).toBe(false);
		expect(publishedAt).toBeGreaterThanOrEqual(before - 1000);
		expect(publishedAt).toBeLessThanOrEqual(Date.now() + 1000);
	});

	test("does not expose drafts through the collection REST API", async () => {
		await payload.create({
			collection: "posts",
			draft: false,
			data: publishedPost({
				title: "Public",
				excerpt: "Visible",
				publishedAt: "2024-02-01T00:00:00.000Z",
			}),
		});
		await payload.create({
			collection: "posts",
			data: {
				title: "Secret draft",
				excerpt: "Hidden",
				_status: "draft",
			},
			draft: true,
		});

		const { default: config } = await import("./payload.config");
		const listResponse = await handleEndpoints({
			config,
			request: new Request("http://localhost:3003/api/posts?draft=true"),
		});
		const versionsResponse = await handleEndpoints({
			config,
			request: new Request("http://localhost:3003/api/posts/versions"),
		});

		expect(listResponse.status).toBe(200);
		const list = (await listResponse.json()) as { docs: Array<{ title: string }> };
		expect(list.docs.map((doc) => doc.title)).toEqual(["Public"]);
		expect(versionsResponse.status).toBeGreaterThanOrEqual(400);
	});

	test("rejects anonymous writes", async () => {
		await expect(
			payload.create({
				collection: "posts",
				draft: false,
				data: publishedPost({ title: "Intruder", excerpt: "no" }),
				overrideAccess: false,
			}),
		).rejects.toThrow();
	});

	test("GET /api/published-posts returns the teaser list and honors limit", async () => {
		await payload.create({
			collection: "posts",
			draft: false,
			data: publishedPost({
				title: "Older news",
				excerpt: "First",
				publishedAt: "2020-01-01T00:00:00.000Z",
			}),
		});
		await payload.create({
			collection: "posts",
			draft: false,
			data: publishedPost({
				title: "Newer news",
				excerpt: "Second",
				publishedAt: "2024-06-01T00:00:00.000Z",
			}),
		});
		await payload.create({
			collection: "posts",
			data: {
				title: "Hidden draft",
				excerpt: "Do not show",
				_status: "draft",
			},
			draft: true,
		});

		const { default: config } = await import("./payload.config");
		const response = await handleEndpoints({
			config,
			request: new Request("http://localhost:3003/api/published-posts?limit=1"),
		});

		expect(response.status).toBe(200);
		const body = (await response.json()) as { docs: Array<{ title: string }> };
		expect(body.docs).toEqual([
			expect.objectContaining({
				title: "Newer news",
				excerpt: "Second",
				slug: "newer-news",
				url: "/newer-news",
				publishedAt: "2024-06-01T00:00:00.000Z",
			}),
		]);
		expect(Object.keys(body.docs[0] ?? {}).sort()).toEqual([
			"excerpt",
			"id",
			"publishedAt",
			"slug",
			"title",
			"url",
		]);
	});
});
