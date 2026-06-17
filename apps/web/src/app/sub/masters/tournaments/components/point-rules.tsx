import { Table } from "@radix-ui/themes";
import type {TournamentDataTypes} from "@/types";

export function PointRules({ tournament }: Props) {
	return (
		<Table.Row>
			<Table.RowHeaderCell>Punkteregel (Turnier)</Table.RowHeaderCell>
			<Table.Cell>
				<ul>
					<li>
						Sieg: <strong>{tournament.pointRule === "1-point" ? "1 Punkt" : "3 Punkte"}</strong>
					</li>
					<li>
						Remis: <strong>{tournament.pointRule === "1-point" ? "0,5 Punkte" : "1 Punkt"}</strong>
					</li>
					<li>
						Niederlage: <strong>0 Punkte</strong>
					</li>
				</ul>
			</Table.Cell>
		</Table.Row>
	);
}

interface Props {
  tournament: TournamentDataTypes;
}