import path from "node:path";
import { fileURLToPath } from "node:url";

const mastersRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

export const scoreboardDatabaseDir = path.join(
	mastersRoot,
	"scoreboard/database",
);

export const finals2024DatabaseDir = path.join(
	mastersRoot,
	"finals/2024/database",
);
