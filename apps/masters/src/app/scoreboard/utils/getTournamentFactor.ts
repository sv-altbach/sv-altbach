export function getTournamentFactor(tournamentLength: number) {
	if (tournamentLength <= 40) {
		return 1.0;
	}

	if (tournamentLength <= 70) {
		return 1.05;
	}

	if (tournamentLength <= 100) {
		return 1.1;
	}

	if (tournamentLength > 100) {
		return 1.15;
	}

	return 1.0;
}
