import path from "node:path";
import { fileURLToPath } from "node:url";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { mcpPlugin } from "@payloadcms/plugin-mcp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Media],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: vercelPostgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL || "",
		},
		prodMigrations: migrations,
	}),
	plugins: [
		mcpPlugin({
			collections: {
				media: {
					description:
						"Uploaded images and files used across SV Altbach sites.",
					enabled: true,
				},
			},
			mcp: {
				serverOptions: {
					serverInfo: {
						name: "SV Altbach CMS",
						version: "1.0.0",
					},
				},
			},
		}),
		vercelBlobStorage({
			collections: {
				media: true,
			},
			// Client uploads avoid Vercel body-size limits; only when Blob is on.
			clientUploads: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
			// When unset, the plugin disables itself and media uses local disk.
			token: process.env.BLOB_READ_WRITE_TOKEN,
		}),
	],
});
