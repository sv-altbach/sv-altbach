import fs from "node:fs";
import { hasPlayedAllTournaments } from "@/app/sub/masters/scoreboard/utils/playerUtils";
import { pointMapping } from "@/app/sub/masters/scoreboard/utils/pointMapping";
import type { Player, Team, TournamentResult } from "@/types";

export const fillPlayerDatabase = (
	tournamentResult: TournamentResult,
	originalTournamentResults: TournamentResult[],
	playerDatabase: Player[],
) => {
	const playerExists = playerDatabase.find(
		(player) => player.name === tournamentResult.name,
	);

	if (playerExists) {
		return;
	}

	const tournament1 = findTournament(
		originalTournamentResults,
		tournamentResult,
		1,
	);
	const tournament2 = findTournament(
		originalTournamentResults,
		tournamentResult,
		2,
	);
	const tournament3 = findTournament(
		originalTournamentResults,
		tournamentResult,
		3,
	);
	const tournament4 = findTournament(
		originalTournamentResults,
		tournamentResult,
		4,
	);
	const tournament5 = findTournament(
		originalTournamentResults,
		tournamentResult,
		5,
	);

	const tournamentData = {
		tournament1,
		tournament2,
		tournament3,
		tournament4,
		tournament5,
	};
	const tournamentResults = Object.values(tournamentData).filter(
		(result): result is TournamentResult => result !== null,
	);

	playerDatabase.push({
		name: tournamentResult.name,
		team: getTeamId(tournamentResult),
		tournamentData: tournamentData,
		tournamentPoints: getTournamentPoints(
			tournament1,
			tournament2,
			tournament3,
			tournament4,
			tournament5,
		),
		teamPoints: getTournamentPoints(
			tournament1,
			tournament2,
			tournament3,
			tournament4,
			tournament5,
			getTeam(tournamentResult),
		),
		averagePosition: getAveragePosition(
			getTournamentPositionsSum(tournamentResults),
			tournamentResults,
		),
		bestPosition: getBestPosition(tournamentResults),
		eloPerformance: getEloPerformance(
			getTournamentEloPerformanceSum(tournamentResults),
			tournamentResults,
		),
		hasPlayedAllTournaments: hasPlayedAllTournaments(tournamentResults.length),
	});
};

function getTeam(tournamentResult: TournamentResult) {
	const databaseFiles = fs.readdirSync(
		"src/app/sub/masters/scoreboard/database",
		{
			encoding: "utf-8",
		},
	);

	const teams: Team[] = databaseFiles
		.flatMap((databaseFile) => {
			if (!databaseFile.startsWith("teams")) {
				return null;
			}

			const teamsFileContent = fs.readFileSync(
				`src/app/sub/masters/scoreboard/database/${databaseFile}`,
				{ encoding: "utf-8" },
			);
			return JSON.parse(teamsFileContent);
		})
		.filter(Boolean);

	return teams.find((team) =>
		team.players.find((player) => player === tournamentResult.name),
	)?.registrationEntry;
}

function getTeamId(tournamentResult: TournamentResult) {
	const databaseFiles = fs.readdirSync(
		"src/app/sub/masters/scoreboard/database",
		{
			encoding: "utf-8",
		},
	);

	const teams: Team[] = databaseFiles
		.flatMap((databaseFile) => {
			if (!databaseFile.startsWith("teams")) {
				return null;
			}

			const teamsFileContent = fs.readFileSync(
				`src/app/sub/masters/scoreboard/database/${databaseFile}`,
				{ encoding: "utf-8" },
			);
			return JSON.parse(teamsFileContent);
		})
		.filter(Boolean);

	const team = teams.find((team) =>
		team.players.find((player) => player === tournamentResult.name),
	)?.id;

	return team ?? "no-team";
}

function getTournamentEloPerformanceSum(
	tournamentDatas: (TournamentResult | null)[],
) {
	return tournamentDatas
		.map((tournament) => (tournament === null ? 0 : tournament.eloPerformance))
		.reduce((accumulator, currentValue) => accumulator + currentValue);
}

function getTournamentPositionsSum(
	tournamentDatas: (TournamentResult | null)[],
) {
	return tournamentDatas
		.map((tournament) => (tournament === null ? 0 : tournament.position))
		.reduce((accumulator, currentValue) => accumulator + currentValue);
}

function getAveragePosition(
	tournamentPositionsSum: number,
	tournamentResults: TournamentResult[],
) {
	return parseFloat(
		(tournamentPositionsSum / tournamentResults.length).toFixed(1),
	);
}

function getBestPosition(tournamentResults: TournamentResult[]) {
	return Math.min(
		...tournamentResults.map((tournament) => tournament.position),
	);
}

function getEloPerformance(
	tournamentEloPerformanceSum: number,
	tournamentResults: TournamentResult[],
) {
	return parseFloat(
		(tournamentEloPerformanceSum / tournamentResults.length).toFixed(1),
	);
}

function findTournament(
	originalTournamentResults: TournamentResult[],
	tournamentResult: TournamentResult,
	tournamentNumber: number,
) {
	return (
		originalTournamentResults.find(
			(originalTournamentResult) =>
				originalTournamentResult.tournament === tournamentNumber &&
				originalTournamentResult.name === tournamentResult.name,
		) ?? null
	);
}

function getTournamentPoints(
	tournament1: TournamentResult | null,
	tournament2: TournamentResult | null,
	tournament3: TournamentResult | null,
	tournament4: TournamentResult | null,
	tournament5: TournamentResult | null,
	startAt?: number,
) {
	const pointsTournament1 = pointMapping.get(tournament1?.position) ?? 0;
	const pointsTournament2 = pointMapping.get(tournament2?.position) ?? 0;
	const pointsTournament3 = pointMapping.get(tournament3?.position) ?? 0;
	const pointsTournament4 = pointMapping.get(tournament4?.position) ?? 0;
	const pointsTournament5 = pointMapping.get(tournament5?.position) ?? 0;

	if (startAt && startAt === 3) {
		return pointsTournament3 + pointsTournament4 + pointsTournament5;
	}

	return (
		pointsTournament1 +
		pointsTournament2 +
		pointsTournament3 +
		pointsTournament4 +
		pointsTournament5
	);
}
