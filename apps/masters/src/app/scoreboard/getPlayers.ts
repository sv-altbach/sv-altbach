import { fillPlayerDatabase } from "@/app/scoreboard/utils/fillPlayerDatabase";
import { getTournamentResults } from "@/app/scoreboard/utils/getTournamentResults";
import { sortPlayers } from "@/app/scoreboard/utils/sortPlayers";
import type { Player } from "@/app/types";

const playerDatabase: Player[] = [];

getTournamentResults().forEach((tournamentResult) => {
	fillPlayerDatabase(tournamentResult, playerDatabase);
});

// Entferne das schlechteste Turnier, wenn fünf Turniere gespielt wurden
playerDatabase.forEach((p) => {
	if (p.playedTournaments === 5) {
		const sortedArray = p.tournaments.toSorted((a, b) => a.points - b.points);
		const worstTournament = sortedArray.at(0)!;

		p.tournamentPoints -= worstTournament.points;
		p.buchholz -= worstTournament.buchholz;
		p.rankSum -= worstTournament.rank;
		p.averageRank = p.rankSum / (p.playedTournaments - 1);
		p.worstTournament = worstTournament.tournamentId;
	}
});

const players = playerDatabase.sort((a, b) => sortPlayers(a, b));

export function getPlayers() {
	return players;
}
