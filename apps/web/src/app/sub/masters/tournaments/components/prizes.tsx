import { Table, Text } from "@radix-ui/themes";

export function Prizes() {
	return (
		<Table.Row>
			<Table.RowHeaderCell width="250px">
				<Text as="p">Preise</Text>
			</Table.RowHeaderCell>

			<Table.Cell className="space-y-5">
				<section>
					<Text as="p">
						Siehe Ausschreibung
					</Text>
				</section>
			</Table.Cell>
		</Table.Row>
	);
}
