import type { Player } from "@/types";

export function sortPlayers(a: Player, b: Player) {
	if (
		a.tournamentPoints === undefined ||
		b.tournamentPoints === undefined ||
		a.buchholz === undefined ||
    b.buchholz === undefined
	) {
		return 0;
	}

	if (a.tournamentPoints !== b.tournamentPoints) {
		return b.tournamentPoints - a.tournamentPoints;
	}

	if (a.buchholz !== b.buchholz) {
		return b.buchholz - a.buchholz;
	}

	return 0;
}
