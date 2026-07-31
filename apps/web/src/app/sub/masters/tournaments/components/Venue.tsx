import { Table } from "@radix-ui/themes";
import type { TournamentDataTypes } from "@/app/sub/masters/types";

export function Venue({ tournament }: Props) {
	return (
		<Table.Row>
			<Table.RowHeaderCell>Spiellokal</Table.RowHeaderCell>
			<Table.Cell>
				{tournament.venue ?? "Spiellokal wird bald bekanntgegeben"}
			</Table.Cell>
		</Table.Row>
	);
}

interface Props {
	tournament: TournamentDataTypes;
}
