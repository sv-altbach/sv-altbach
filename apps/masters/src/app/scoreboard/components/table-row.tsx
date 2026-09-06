import { Table, Tooltip } from "@radix-ui/themes";
import { IconArrowBadgeUp, IconX } from "@tabler/icons-react";
import type { Player, PlayerMarker } from "@/app/types";
import { getPlayerName } from "@/utils/utils";
import { DisplayResult } from "@/app/scoreboard/components/DisplayResult";
import { prettyNumbers } from "@/app/scoreboard/utils/prettyNumbers";
import { getMasterPointsCalculationDetailsText } from "@/app/scoreboard/utils/getMasterPointsCalculationDetailsText";

interface Props {
	playerRowData: {
		player: Player;
		index: number;
		marker: PlayerMarker;
	};
}

export function TableRow({ playerRowData }: Props) {
	const { player, index, marker } = playerRowData;

	if (!player) {
		return null;
	}

	return (
		<Table.Row>
			<Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
			<Table.Cell minWidth="250px">
				<div className="flex items-center">
					{getPlayerName(player.name)} {displayNotQualifiedMarker(marker)}
				</div>
			</Table.Cell>

			<Table.Cell justify="center">
				<DisplayResult
					points={player.tournament1}
					tooltip={getMasterPointsCalculationDetailsText(player, "tournament_1")}
				/>
			</Table.Cell>
			<Table.Cell justify="center">
				<DisplayResult
					points={player.tournament2}
					tooltip={getMasterPointsCalculationDetailsText(player, "tournament_2")}
				/>
			</Table.Cell>
			<Table.Cell justify="center">
				<DisplayResult
					points={player.tournament3}
					tooltip={getMasterPointsCalculationDetailsText(player, "tournament_3")}
				/>
			</Table.Cell>
			<Table.Cell justify="center">
				<DisplayResult
					points={player.tournament4}
					tooltip={getMasterPointsCalculationDetailsText(player, "tournament_4")}
				/>
			</Table.Cell>
			<Table.Cell justify="center">
				<DisplayResult
					points={player.tournament5}
					tooltip={getMasterPointsCalculationDetailsText(player, "tournament_5")}
				/>
			</Table.Cell>
			<Table.Cell justify="center">{prettyNumbers(player.averageRank)}</Table.Cell>
			<Table.Cell justify="center">{prettyNumbers(player.tournamentPoints)}</Table.Cell>
		</Table.Row>
	);
}

function displayNotQualifiedMarker(marker: PlayerMarker) {
	if (marker === "none") {
		return null;
	}

	return (
		<>
			<Tooltip
				width="180px"
				content={
					marker === "successor"
						? "Aktuell als Nachrücker für das Finale qualifiziert."
						: "Nicht für das Finale qualifiziert. Mindestvoraussetzung sind drei gewertete Turniere."
				}
			>
				{marker === "successor" ? (
					<IconArrowBadgeUp className="text-3xl text-red-600" aria-hidden="true" />
				) : (
					<IconX className="text-3xl text-red-600" aria-hidden="true" />
				)}
			</Tooltip>

			<div className="sr-only">
				{marker === "successor" && (
					<p>Aktuell als Nachrücker für das Finale qualifiziert.</p>
				)}

				{marker === "not-qualified" && (
					<p>
						Nicht für das Finale qualifiziert. Mindestvoraussetzung sind drei gewertete
						Turniere.
					</p>
				)}
			</div>
		</>
	);
}
