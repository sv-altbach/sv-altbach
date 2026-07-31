import type {
	Player,
	TournamentResult,
	TournamentResultPlayer,
} from "@/app/sub/masters/types";

export const fillPlayerDatabase = (
	tournamentResult: TournamentResult,
	playerDatabase: Player[],
) => {
	tournamentResult.data.rows.forEach((player) => {
		const playerExists = playerDatabase.find((p) => p.id === player.playerId);

		if (playerExists) {
			playerDatabase.forEach((p) => {
				if (p.id === playerExists.id) {
					p[`tournament${tournamentResult.data.tournamentNumber}`] =
						getMastersPoints(player, tournamentResult);
					p.playedTournaments += 1;
					p.tournamentPoints += getMastersPoints(player, tournamentResult);
					p.buchholz += player.buchholz;
					p.rankSum += player.rank;
					p.averageRank = p.rankSum / p.playedTournaments;
				}
			});

			return;
		}

		const newPlayer: Player = {
			id: player.playerId,
			name: player.name,
			playedTournaments: 1,
			tournamentPoints: getMastersPoints(player, tournamentResult),
			buchholz: player.buchholz,
			rankSum: player.rank,
			averageRank: player.rank,
		};

		const tournamentKey =
			`tournament${tournamentResult.data.tournamentNumber}` as `tournament${number}`;
		newPlayer[tournamentKey] = getMastersPoints(player, tournamentResult);

		playerDatabase.push(newPlayer);
	});
};

// function getAverageRank() {
//
// }

function getMastersPoints(
	player: TournamentResultPlayer,
	tournamentResult: TournamentResult,
) {
	const BY_100 = 100;
	const POINT_RULE = tournamentResult.data.pointRule === "1-point" ? 1 : 3;
	const TOURNAMENT_FACTOR = getTournamentFactor(
		tournamentResult.data.rows.length,
	);
	return (
		BY_100 *
		(player.score / (tournamentResult.data.totalRounds * POINT_RULE)) *
		TOURNAMENT_FACTOR
	);
}

function getTournamentFactor(tournamentLength: number) {
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
