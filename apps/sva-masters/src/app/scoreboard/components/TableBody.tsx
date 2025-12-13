import { Flex, Table, Text } from "@radix-ui/themes";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import TableRow from "@/app/scoreboard/components/TableRow";
import { getPlayers, getTeams } from "@/app/scoreboard/getPlayers";

interface Props {
	isPlayerTable: boolean;
}

const TableBody = ({ isPlayerTable }: Props) => {
	const players = getPlayers();
	const teams = getTeams();
	const playersInFinal = players.slice(0, 16);
	const restPlayers = players.slice(16);

	if (isPlayerTable) {
		return (
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
							<MdOutlineKeyboardDoubleArrowUp className="text-3xl text-red-600" />
							<Text>Für das Finale qualifiziert</Text>
							<MdOutlineKeyboardDoubleArrowUp className="text-3xl text-red-600" />
						</Flex>
					</Table.Cell>
				</Table.Row>

				{restPlayers.map((player, index) => (
					<TableRow key={player.name} player={player} index={index + 16} />
				))}
			</Table.Body>
		);
	}

	return (
		<Table.Body>
			{teams.map((team, index) => (
				<TableRow key={team.id} team={team} index={index} />
			))}
		</Table.Body>
	);
};

export default TableBody;
