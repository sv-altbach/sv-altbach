import * as migration_20260507_221425_initial from "./20260507_221425_initial";
import * as migration_20260923_135107_posts from "./20260923_135107_posts";

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
];
