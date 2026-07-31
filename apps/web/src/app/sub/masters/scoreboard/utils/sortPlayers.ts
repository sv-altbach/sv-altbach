import type { Player } from "@/app/sub/masters/types";

export function sortPlayers(a: Player, b: Player) {
	if (
		a.tournamentPoints === undefined ||
		b.tournamentPoints === undefined ||
		a.averageRank === undefined ||
    b.averageRank === undefined
	) {
		return 0;
	}

	if (a.tournamentPoints !== b.tournamentPoints) {
		return b.tournamentPoints - a.tournamentPoints;
	}

	if (a.averageRank !== b.averageRank) {
		return a.averageRank - b.averageRank;
	}

	return 0;
}
