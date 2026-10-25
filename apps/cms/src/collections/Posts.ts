import type { CollectionConfig, DateField } from "payload";
import { slugField } from "payload";

import { authenticated, authenticatedOrPublished } from "../access/authenticated";
import { slugifyGerman, slugifyPostTitle } from "../slugify";

const publishedAtField: DateField = {
	name: "publishedAt",
	type: "date",
	admin: {
		date: {
			pickerAppearance: "dayAndTime",
		},
		description: "When this Post became public. Filled automatically on first publish.",
		position: "sidebar",
	},
	index: true,
	hooks: {
		beforeChange: [
			({ siblingData, value }) => {
				if (siblingData._status === "published" && !value) {
					return new Date().toISOString();
				}

				return value;
			},
		],
	},
};

export const Posts: CollectionConfig = {
	slug: "posts",
	admin: {
		defaultColumns: ["title", "slug", "publishedAt", "_status"],
		useAsTitle: "title",
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		readVersions: authenticated,
		update: authenticated,
	},
	hooks: {
		beforeValidate: [
			// Payload >= 3.90.2 validates the required slug before slugField's async
			// generator assigns it, so creates without a slug fail (payloadcms/payload#18334).
			// Fill it here, before validation, until that is fixed upstream.
			({ data, operation }) => {
				if (
					operation === "create" &&
					data &&
					!data.slug &&
					typeof data.title === "string"
				) {
					data.slug = slugifyGerman(data.title);
				}

				return data;
			},
		],
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "excerpt",
			type: "textarea",
			admin: {
				description:
					"Short teaser for the Club home page. Leave empty to derive it from the body.",
			},
		},
		{
			name: "body",
			type: "richText",
		},
		slugField({ slugify: slugifyPostTitle, useAsSlug: "title" }),
		publishedAtField,
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			admin: {
				position: "sidebar",
			},
		},
	],
	timestamps: true,
	versions: {
		drafts: true,
		maxPerDoc: 50,
	},
};
