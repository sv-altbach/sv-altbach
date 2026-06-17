import { Table } from "@radix-ui/themes";
import type { TournamentDataTypes } from "@/types";

export function BasicInformation({ tournament }: Props) {
	return (
		<Table.Row>
			<Table.RowHeaderCell>Hinweise</Table.RowHeaderCell>
			<Table.Cell>
				{tournament.generalInformation ?? "Keine weiteren Hinweise."}
			</Table.Cell>
		</Table.Row>
	);
}

interface Props {
	tournament: TournamentDataTypes;
}
