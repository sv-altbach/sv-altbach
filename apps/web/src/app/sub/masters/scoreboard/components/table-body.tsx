import { Flex, Table, Text } from "@radix-ui/themes";
import { IconArrowBadgeUp } from "@tabler/icons-react";
import { TableRow } from "@/app/sub/masters/scoreboard/components/table-row";
import { getPlayers } from "@/app/sub/masters/scoreboard/getPlayers";
import type { PlayerRowData } from "@/types";

export function TableBody() {
	const players = getPlayers();
	const playersInFinal = players.slice(0, 16);
	const restPlayers = players.slice(16);
	const notQualifiedPlayersInTop16 = playersInFinal.filter(
		(player) => player.playedTournaments < 3,
	);
	const successorPlayers = restPlayers
		.filter((player) => player.playedTournaments >= 3)
		.splice(0, notQualifiedPlayersInTop16.length);

	return (
		<Table.Body>
			{playersInFinal.map((player, index) => {
				const playerRowData: PlayerRowData = {
					player: player,
					index: index,
					marker: notQualifiedPlayersInTop16.find((p) => p.id === player.id)
						? "not-qualified"
						: "none",
				};

				return <TableRow key={player.id} playerRowData={playerRowData} />;
			})}

			<Table.Row>
				<Table.Cell
					className="py-5 text-center font-bold uppercase"
					colSpan={10}
				>
					<Flex justify="center" align="center">
						<IconArrowBadgeUp className="text-3xl text-red-600" />
						<Text>Für das Finale qualifiziert</Text>
						<IconArrowBadgeUp className="text-3xl text-red-600" />
					</Flex>
				</Table.Cell>
			</Table.Row>

			{restPlayers.map((player, index) => {
				const playerRowData: PlayerRowData = {
					player: player,
					index: index + 16,
					marker: successorPlayers.find((p) => p.id === player.id)
						? "successor"
						: "none",
				};

				return <TableRow key={player.id} playerRowData={playerRowData} />;
			})}
		</Table.Body>
	);
}
