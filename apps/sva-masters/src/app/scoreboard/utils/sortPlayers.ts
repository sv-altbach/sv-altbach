import type { Player } from "@/types";

export function sortPlayers(a: Player, b: Player) {
	if (
		a.tournamentPoints === undefined ||
		b.tournamentPoints === undefined ||
		a.averagePosition === undefined ||
		b.averagePosition === undefined ||
		a.bestPosition === undefined ||
		b.bestPosition === undefined ||
		a.eloPerformance === undefined ||
		b.eloPerformance === undefined
	) {
		return 0;
	}

	if (a.tournamentPoints !== b.tournamentPoints) {
		return b.tournamentPoints - a.tournamentPoints;
	}

	if (a.averagePosition !== b.averagePosition) {
		return a.averagePosition - b.averagePosition;
	}

	if (a.bestPosition !== b.bestPosition) {
		return a.bestPosition - b.bestPosition;
	}

	if (a.eloPerformance !== b.eloPerformance) {
		return b.eloPerformance - a.eloPerformance;
	}

	return 0;
}
