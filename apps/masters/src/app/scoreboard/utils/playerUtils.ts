import fs from "node:fs";
import { scoreboardDatabaseDir } from "@/app/paths";

export function hasPlayedAllTournaments(numberOfPlayedTournaments: number) {
	const numberOfTournaments = fs
		.readdirSync(scoreboardDatabaseDir, {
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
