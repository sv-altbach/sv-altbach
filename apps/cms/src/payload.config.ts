import path from "node:path";
import { fileURLToPath } from "node:url";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
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
			importMapFile: path.resolve(dirname, "app/importMap.js"),
		},
	},
	// Payload-only app: mount admin at `/` (see Payload Admin Panel docs).
	routes: {
		admin: "/",
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
		vercelBlobStorage({
			collections: {
				media: true,
			},
			// Disabled until monorepo dep resolution is fixed: clientUploads pulls in a
			// second @payloadcms/ui context and crashes admin with
			// "useUploadHandlers must be used within UploadHandlersProvider".
			// Server-side Blob uploads still work with the token below.
			clientUploads: false,
			// When unset, the plugin disables itself and media uses local disk.
			token: process.env.BLOB_READ_WRITE_TOKEN,
		}),
	],
});
