import * as migration_20260507_221425_initial from "./20260507_221425_initial";
import * as migration_20260923_135107_posts from "./20260923_135107_posts";
import * as migration_20261025_153729_remove_post_url from "./20261025_153729_remove_post_url";

export const migrations = [
	{
		up: migration_20260507_221425_initial.up,
		down: migration_20260507_221425_initial.down,
		name: "20260507_221425_initial",
	},
	{
		up: migration_20260923_135107_posts.up,
		down: migration_20260923_135107_posts.down,
		name: "20260923_135107_posts",
	},
	{
		up: migration_20261025_153729_remove_post_url.up,
		down: migration_20261025_153729_remove_post_url.down,
		name: "20261025_153729_remove_post_url",
	},
];
