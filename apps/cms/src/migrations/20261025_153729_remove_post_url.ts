import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-vercel-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   ALTER TABLE "posts" DROP COLUMN "url";
  ALTER TABLE "_posts_v" DROP COLUMN "version_url";`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   ALTER TABLE "posts" ADD COLUMN "url" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_url" varchar;`);
}
