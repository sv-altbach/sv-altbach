import fs from "node:fs";

export function hasPlayedAllTournaments(numberOfPlayedTournaments: number) {
	const numberOfTournaments = fs
		.readdirSync("src/app/sub/masters/scoreboard/database", {
			encoding: "utf-8",
		})
		.map((tournamentFileName) => {
			if (!tournamentFileName.startsWith("tournament")) {
				return null;
			}

			return tournamentFileName;
		})
		.filter(Boolean)?.length;

	return numberOfTournaments === numberOfPlayedTournaments;
}
