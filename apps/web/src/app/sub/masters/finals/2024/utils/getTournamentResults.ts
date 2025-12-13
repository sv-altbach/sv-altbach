import fs from "node:fs";

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
	const tournamentFiles = fs.readdirSync(
		"src/app/sub/masters/finals/2024/database",
		{ encoding: "utf-8" },
	);

	return tournamentFiles.map((tournamentFileName) => {
		const tournamentFileContent = fs.readFileSync(
			`src/app/sub/masters/finals/2024/database/${tournamentFileName}`,
			{ encoding: "utf-8" },
		);

		return {
			id: tournamentFileName,
			data: JSON.parse(tournamentFileContent),
		};
	});
}
