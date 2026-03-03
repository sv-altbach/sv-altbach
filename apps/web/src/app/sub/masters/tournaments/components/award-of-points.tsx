import { Table } from "@radix-ui/themes";

interface Props {
	isFinalTournament: boolean;
}

export function AwardOfPoints({ isFinalTournament }: Props) {
	return (
		<>
			{!isFinalTournament ? (
				<Table.Row>
					<Table.RowHeaderCell>Punkteverteilung</Table.RowHeaderCell>
					<Table.Cell>
						<ul>
							<li>Platz 1: 25 Punkte</li>
							<li>Platz 2: 18 Punkte</li>
							<li>Platz 3: 15 Punkte</li>
							<li>Platz 4: 12 Punkte</li>
							<li>Platz 5: 10 Punkte</li>
							<li>Platz 6 - 10: 8 Punkte</li>
							<li>Platz 11 - 20: 6 Punkte</li>
							<li>Platz 21 - 30: 4 Punkte</li>
							<li>Platz 31 - 40: 2 Punkte</li>
							<li>Platz 41 - 50: 1 Punkt</li>
							<li>ab Platz 51: 0 Punkte</li>
						</ul>
					</Table.Cell>
				</Table.Row>
			) : null}
		</>
	);
}
