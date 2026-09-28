import type { CollectionConfig, DateField } from "payload";
import { slugField } from "payload";

import { authenticated, authenticatedOrPublished } from "../access/authenticated";

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
		slugField({ useAsSlug: "title" }),
		{
			name: "url",
			type: "text",
			admin: {
				description:
					"Public link for this Post (for example a Tumblr archive URL). Leave empty to use /{slug}.",
				position: "sidebar",
			},
		},
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
