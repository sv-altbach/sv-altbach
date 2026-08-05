import type { CollectionConfig } from "payload";

/** Upload collection wired to Vercel Blob (when `BLOB_READ_WRITE_TOKEN` is set). */
export const Media: CollectionConfig = {
	slug: "media",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
	],
	upload: true,
};
