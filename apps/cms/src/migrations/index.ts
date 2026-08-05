import * as migration_20260507_221425_initial from "./20260507_221425_initial";
import * as migration_20260805_160526_mcp_plugin from "./20260805_160526_mcp_plugin";

export const migrations = [
	{
		up: migration_20260507_221425_initial.up,
		down: migration_20260507_221425_initial.down,
		name: "20260507_221425_initial",
	},
	{
		up: migration_20260805_160526_mcp_plugin.up,
		down: migration_20260805_160526_mcp_plugin.down,
		name: "20260805_160526_mcp_plugin",
	},
];
