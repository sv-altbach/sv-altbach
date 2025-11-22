import fs from "node:fs";
import type { TournamentResult } from "@/types";

export function getTournamentResults(): TournamentResult[] {
	const tournamentFiles = fs.readdirSync("src/app/scoreboard/database", {
		encoding: "utf-8",
	});

	return tournamentFiles
		.flatMap((tournamentFileName) => {
			if (!tournamentFileName.startsWith("tournament")) {
				return null;
			}

			const tournamentFileContent = fs.readFileSync(
				`src/app/scoreboard/database/${tournamentFileName}`,
				{ encoding: "utf-8" },
			);
			return JSON.parse(tournamentFileContent);
		})
		.filter(Boolean);
}
