import fs from "node:fs";
import path from "node:path";
import { finals2026DatabaseDir } from "@/app/paths";

export interface TournamentResult {
	position: number;
	name: string;
	wins: number;
	remis: number;
	lost: number;
	points: number;
	buchholz: number;
}

export interface TournamentData {
	id: string;
	data: TournamentResult[];
}

export function getTournamentResults(): TournamentData[] {
	const tournamentFiles = fs.readdirSync(finals2026DatabaseDir, {
		encoding: "utf-8",
	});

	return tournamentFiles.map((tournamentFileName) => {
		const tournamentFileContent = fs.readFileSync(
			path.join(finals2026DatabaseDir, tournamentFileName),
			{ encoding: "utf-8" },
		);

		return {
			id: tournamentFileName,
			data: JSON.parse(tournamentFileContent),
		};
	});
}
