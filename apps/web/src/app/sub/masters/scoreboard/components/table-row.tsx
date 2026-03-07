import { Table, Tooltip } from "@radix-ui/themes";
import { IconArrowBadgeUp } from "@tabler/icons-react";
import { pointMapping } from "@/app/sub/masters/scoreboard/utils/pointMapping";
import type { Player, Team } from "@/types";
import { cn } from "@/utils/ui";
import { getPlayerName } from "@/utils/utils";

interface Props {
	player?: Player;
	team?: Team;
	index: number;
}

export function TableRow({ player, team, index }: Props) {
	if (!player && team) {
		return (
			<Table.Row
				className={cn([
					index === 0 && "bg-[#FFD700]",
					index === 1 && "bg-[#C0C0C0]",
					index === 2 && "bg-[#CD7F32]",
				])}
			>
				<Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
				<Table.Cell>{getTeamName(team)}</Table.Cell>
				<Table.Cell justify="center">
					{Intl.NumberFormat("de-DE")
						.format(team.eloPerformance ?? 0)
						.replace(".", "")}
				</Table.Cell>
				<Table.Cell justify="center">{team.tournamentPoints}</Table.Cell>
			</Table.Row>
		);
	}

	if (!team && player) {
		return (
			<Table.Row
				className={cn([
					index === 0 && "bg-[#FFD700]",
					index === 1 && "bg-[#C0C0C0]",
					index === 2 && "bg-[#CD7F32]",
				])}
			>
				<Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
				<Table.Cell className="flex items-center">
					{getPlayerName(player.name)}{" "}
					{renderHasPlayedAllTournamentsIndicator(player, index)}
				</Table.Cell>
				<Table.Cell justify="center">
					{pointMapping.get(player.tournamentData.tournament1?.position) ?? 0}
				</Table.Cell>
				<Table.Cell justify="center">
					{pointMapping.get(player.tournamentData.tournament2?.position) ?? 0}
				</Table.Cell>
				<Table.Cell justify="center">
					{pointMapping.get(player.tournamentData.tournament3?.position) ?? 0}
				</Table.Cell>
				<Table.Cell justify="center">
					{pointMapping.get(player.tournamentData.tournament4?.position) ?? 0}
				</Table.Cell>
				<Table.Cell justify="center">
					{pointMapping.get(player.tournamentData.tournament5?.position) ?? 0}
				</Table.Cell>
				<Table.Cell justify="center">
					{Intl.NumberFormat("de-DE")
						.format(player.averagePosition ?? 0)
						.replace(".", "")}
				</Table.Cell>
				<Table.Cell justify="center">{player.bestPosition}</Table.Cell>
				<Table.Cell justify="center">
					{Intl.NumberFormat("de-DE")
						.format(player.eloPerformance ?? 0)
						.replace(".", "")}
				</Table.Cell>
				<Table.Cell justify="center">{player.tournamentPoints}</Table.Cell>
			</Table.Row>
		);
	}

	return null;
}

function renderHasPlayedAllTournamentsIndicator(player: Player, index: number) {
	if (index < 16) {
		return null;
	}

	if (player.hasPlayedAllTournaments || player.name === "Uhl,Lars") {
		return (
			<p>
				<Tooltip
					width="180px"
					content="Für das Finale qualifiziert. Bei allen Turnieren dabei gewesen."
				>
					<IconArrowBadgeUp
						className="text-3xl text-red-600"
						aria-hidden="true"
					/>
				</Tooltip>
				<span className="sr-only">
					Für das Finale qualifiziert. Bei allen Turnieren dabei gewesen.
				</span>
			</p>
		);
	}

	return null;
}

function getTeamName(team: Team) {
	const playerNames = team.players.map((player) => {
		return player.split(",").reverse().join(" ");
	});

	return playerNames.join(", ");
}
