import { type Player, type TournamentResult } from "@/app/types";
import fs from "node:fs";
import { scoreboardDatabaseDir } from "@/app/paths";
import path from "node:path";
import { getTournamentFactor } from "@/app/scoreboard/utils/getTournamentFactor";

export function getMasterPointsCalculationDetailsText(
	player: Player,
	tournament: "tournament_1" | "tournament_2" | "tournament_3" | "tournament_4" | "tournament_5",
) {
	try {
		const tournamentFileContent = fs.readFileSync(
			path.join(scoreboardDatabaseDir, `${tournament}.json`),
			{ encoding: "utf-8" },
		);

		const tournamentResult = JSON.parse(tournamentFileContent) as TournamentResult;
		const score = tournamentResult.data.rows.find((p) => p.playerId === player.id)?.score ?? 0;

		return getDetailsString(score, tournamentResult);
	} catch (error: unknown) {
		if (error instanceof Error && "code" in error && error.code === "ENOENT") {
			return "Turnierergebnisse ausstehend";
		}

		throw error;
	}
}

function getDetailsString(score: number, tournamentResult: TournamentResult) {
	const BY_100 = 100;
	const POINT_RULE = tournamentResult.data.pointRule === "1-point" ? 1 : 3;
	const TOURNAMENT_FACTOR = getTournamentFactor(tournamentResult.data.rows.length);
	const total = tournamentResult.data.totalRounds * POINT_RULE;
	return `${BY_100} * (${score} / ${total}) * ${TOURNAMENT_FACTOR}`;
}
