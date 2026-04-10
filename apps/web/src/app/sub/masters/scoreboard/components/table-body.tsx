import { Flex, Table, Text } from "@radix-ui/themes";
import { IconArrowBadgeUp } from "@tabler/icons-react";
import { TableRow } from "@/app/sub/masters/scoreboard/components/table-row";
import { getPlayers, getTeams } from "@/app/sub/masters/scoreboard/getPlayers";

interface Props {
	isPlayerTable: boolean;
}

export function TableBody({ isPlayerTable }: Props) {
	const players = getPlayers();
	const teams = getTeams();
	const playersInFinal = players.slice(0, 16);
	const restPlayers = players.slice(16);

	return isPlayerTable ? (
		<Table.Body>
			{playersInFinal.map((player, index) => (
				<TableRow key={player.name} player={player} index={index} />
			))}

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

			{restPlayers.map((player, index) => (
				<TableRow key={player.name} player={player} index={index + 16} />
			))}
		</Table.Body>
	) : (
		<Table.Body>
			{teams.map((team, index) => (
				<TableRow key={team.id} team={team} index={index} />
			))}
		</Table.Body>
	);
}
