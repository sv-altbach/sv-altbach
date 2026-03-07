import { Table } from "@radix-ui/themes";

interface Props {
	isFinalTournament: boolean;
}

export function PointRules({ isFinalTournament }: Props) {
	return (
		<Table.Row>
			<Table.RowHeaderCell>Punkteregel (Turnier)</Table.RowHeaderCell>
			<Table.Cell>
				<ul>
					<li>
						Sieg: <strong>3 Punkte</strong>
					</li>
					<li>
						Remis: <strong>1 Punkt</strong>
					</li>
					<li>
						Niederlage: <strong>0 Punkte</strong>
					</li>
				</ul>

				{isFinalTournament ? (
					<p className="mt-5">
						Die Zweitwertung ist der direkte Vergleich, die Drittwertung ist
						Buchholz.
					</p>
				) : null}
			</Table.Cell>
		</Table.Row>
	);
}
