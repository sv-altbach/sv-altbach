import { fillPlayerDatabase } from "@/app/sub/masters/scoreboard/utils/fillPlayerDatabase";
import { getTournamentResults } from "@/app/sub/masters/scoreboard/utils/getTournamentResults";
import { sortPlayers } from "@/app/sub/masters/scoreboard/utils/sortPlayers";
import type { Player } from "@/types";

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

export function getPlayers() {
	return players;
}
