import fs from "node:fs";
import path from "node:path";
import { scoreboardDatabaseDir } from "@/app/paths";
import type { TournamentResult } from "@/app/types";

export function getTournamentResults(): TournamentResult[] {
	const tournamentFiles = fs.readdirSync(scoreboardDatabaseDir, {
		encoding: "utf-8",
	});

	return tournamentFiles
		.flatMap((tournamentFileName) => {
			if (!tournamentFileName.startsWith("tournament")) {
				return null;
			}

			const tournamentFileContent = fs.readFileSync(
				path.join(scoreboardDatabaseDir, tournamentFileName),
				{ encoding: "utf-8" },
			);
			return JSON.parse(tournamentFileContent);
		})
		.filter(Boolean);
}
