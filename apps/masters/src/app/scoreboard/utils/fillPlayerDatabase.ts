import { getTournamentFactor } from "@/app/scoreboard/utils/getTournamentFactor";
import type { Player, TournamentIds, TournamentResult, TournamentResultPlayer } from "@/app/types";

export const fillPlayerDatabase = (
	tournamentResult: TournamentResult,
	playerDatabase: Player[],
) => {
	tournamentResult.data.rows.forEach((player) => {
		const playerExists = playerDatabase.find((p) => p.id === player.playerId);

		if (playerExists) {
			playerDatabase.forEach((p) => {
				if (p.id === playerExists.id) {
					p.playedTournaments += 1;
					p.tournaments.push({
						tournamentId:
							`tournament_${tournamentResult.data.tournamentNumber}` as TournamentIds,
						points: getMastersPoints(player, tournamentResult),
						rank: player.rank,
						score: player.score,
						buchholz: player.buchholz,
						rating: player.rating,
					});
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
			tournaments: [
				{
					tournamentId:
						`tournament_${tournamentResult.data.tournamentNumber}` as TournamentIds,
					points: getMastersPoints(player, tournamentResult),
					rank: player.rank,
					score: player.score,
					buchholz: player.buchholz,
					rating: player.rating,
				},
			],
		};

		playerDatabase.push(newPlayer);
	});
};

function getMastersPoints(player: TournamentResultPlayer, tournamentResult: TournamentResult) {
	const BY_100 = 100;
	const POINT_RULE = tournamentResult.data.pointRule === "1-point" ? 1 : 3;
	const TOURNAMENT_FACTOR = getTournamentFactor(tournamentResult.data.rows.length);
	return (
		BY_100 *
		(player.score / (tournamentResult.data.totalRounds * POINT_RULE)) *
		TOURNAMENT_FACTOR
	);
}
