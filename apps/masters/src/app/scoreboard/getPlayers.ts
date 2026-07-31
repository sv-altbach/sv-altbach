import { fillPlayerDatabase } from "@/app/scoreboard/utils/fillPlayerDatabase";
import { getTournamentResults } from "@/app/scoreboard/utils/getTournamentResults";
import { sortPlayers } from "@/app/scoreboard/utils/sortPlayers";
import type { Player } from "@/app/types";

const playerDatabase: Player[] = [];

getTournamentResults().forEach((tournamentResult) => {
	fillPlayerDatabase(tournamentResult, playerDatabase);
});

const players = playerDatabase.sort((a, b) => sortPlayers(a, b));

export function getPlayers() {
	return players;
}
