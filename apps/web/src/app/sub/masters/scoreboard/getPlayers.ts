import fs from "node:fs";
import { fillPlayerDatabase } from "@/app/sub/masters/scoreboard/utils/fillPlayerDatabase";
import { getTournamentResults } from "@/app/sub/masters/scoreboard/utils/getTournamentResults";
import { sortPlayers } from "@/app/sub/masters/scoreboard/utils/sortPlayers";
import { sortTeams } from "@/app/sub/masters/scoreboard/utils/sortTeams";
import type { Player, Team } from "@/types";

const playerDatabase: Player[] = [];

getTournamentResults().forEach(
	(tournamentResult, _index, originalTournamentResults) => {
		fillPlayerDatabase(
			tournamentResult,
			originalTournamentResults,
			playerDatabase,
		);
	},
);

const players = playerDatabase.sort((a, b) => sortPlayers(a, b));

export function getTeams() {
	return createTeamDatabase().sort((a, b) => sortTeams(a, b));
}

export function getPlayers() {
	return players;
}

function createTeamDatabase() {
	const databaseFiles = fs.readdirSync(
		"src/app/sub/masters/scoreboard/database",
		{
			encoding: "utf-8",
		},
	);

	const teamsFromDatabase: Team[] = databaseFiles
		.flatMap((databaseFile) => {
			if (!databaseFile.startsWith("teams")) {
				return null;
			}

			const teamsFileContent = fs.readFileSync(
				`src/app/sub/masters/scoreboard/database/${databaseFile}`,
				{
					encoding: "utf-8",
				},
			);
			return JSON.parse(teamsFileContent);
		})
		.filter(Boolean);

	return teamsFromDatabase.map((team) => {
		const tournamentPoints = playerDatabase
			.filter((player) => player.team === team.id)
			.map((player) => player.teamPoints)
			.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

		const eloPerformance = Math.round(
			playerDatabase
				.filter((player) => player.team === team.id)
				.map((player) => player.eloPerformance)
				.filter((elo): elo is number => typeof elo === "number")
				.reduce(
					(previousValue, currentValue) => previousValue + currentValue,
					0,
				) / team.players.length,
		);

		return {
			...team,
			tournamentPoints,
			eloPerformance,
		};
	});
}
