import type { Team } from "@/types";

export function sortTeams(a: Team, b: Team) {
	if (
		!a.tournamentPoints ||
		!b.tournamentPoints ||
		!a.eloPerformance ||
		!b.eloPerformance
	) {
		return 0;
	}

	if (a.tournamentPoints !== b.tournamentPoints) {
		return b.tournamentPoints - a.tournamentPoints;
	}

	if (a.eloPerformance !== b.eloPerformance) {
		return b.eloPerformance - a.eloPerformance;
	}

	return 0;
}
