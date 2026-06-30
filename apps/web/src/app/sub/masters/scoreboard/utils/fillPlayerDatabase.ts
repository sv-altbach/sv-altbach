import type {Player, TournamentResult, TournamentResultPlayer} from "@/types";

export const fillPlayerDatabase = (
	tournamentResult: TournamentResult,
	playerDatabase: Player[],
) => {
  tournamentResult.data.rows.forEach(player => {
    const playerExists = playerDatabase.find(
        (p) => p.id === player.playerId,
    );

    if (playerExists) {
      playerDatabase.forEach(p => {
        if(p.id === playerExists.id) {
          p.tournamentPoints += getMastersPoints(player, tournamentResult);
          p.buchholz += player.buchholz;
        }
      })
      return;
    }

    playerDatabase.push({
      id: player.playerId,
      name: player.name,
      tournamentPoints: getMastersPoints(player, tournamentResult),
      buchholz: player.buchholz,
    });
  })
};

function getMastersPoints(player: TournamentResultPlayer, tournamentResult: TournamentResult) {
  const BY_100 = 100;
  const POINT_RULE = tournamentResult.data.pointRule === "1-point" ? 1 : 3;
  const TOURNAMENT_FACTOR = getTournamentFactor(tournamentResult.data.rows.length);
  return (BY_100 * (player.score / (tournamentResult.data.totalRounds * POINT_RULE)) * TOURNAMENT_FACTOR);
}

function getTournamentFactor(tournamentLength: number) {
  if(tournamentLength <= 40) {
    return 1.00;
  }

  if(tournamentLength <= 70) {
    return 1.05;
  }

  if(tournamentLength <= 100) {
    return 1.10;
  }

  if(tournamentLength > 100) {
    return 1.15;
  }

  return 1.00;
}