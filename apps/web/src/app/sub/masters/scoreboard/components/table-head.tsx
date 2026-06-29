import { Table } from "@radix-ui/themes";

export function TableHead() {
	return (
		<Table.Header>
			<Table.Row>
				<Table.ColumnHeaderCell>Pos.</Table.ColumnHeaderCell>
				<Table.ColumnHeaderCell>Spieler</Table.ColumnHeaderCell>

        <Table.ColumnHeaderCell justify="center">
          <span className="sr-only">Punkte</span> Turnier 1
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell justify="center">
          <span className="sr-only">Punkte</span> Turnier 2
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell justify="center">
          <span className="sr-only">Punkte</span> Turnier 3
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell justify="center">
          <span className="sr-only">Punkte</span> Turnier 4
        </Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell justify="center">
          <span className="sr-only">Punkte</span> Turnier 5
        </Table.ColumnHeaderCell>

        <Table.ColumnHeaderCell justify="center">
          &#8960; Platzierung
        </Table.ColumnHeaderCell>

        <Table.ColumnHeaderCell justify="center">
          Beste Platzierung
        </Table.ColumnHeaderCell>

				<Table.ColumnHeaderCell justify="center">
					Elo-Leistung
				</Table.ColumnHeaderCell>
				<Table.ColumnHeaderCell justify="center">Gesamt</Table.ColumnHeaderCell>
			</Table.Row>
		</Table.Header>
	);
}
