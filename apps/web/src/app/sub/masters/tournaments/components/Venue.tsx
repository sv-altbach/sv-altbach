import { Table, Text } from "@radix-ui/themes";

interface Props {
	value?: string;
}

export function Venue({ value }: Props) {
	return (
		<Table.Row>
			<Table.RowHeaderCell>Spiellokal</Table.RowHeaderCell>
			<Table.Cell>
				<VenueContent value={value} />
			</Table.Cell>
		</Table.Row>
	);
}

function VenueContent({ value }: { value?: string }) {
	if (value === "tournament_1" || value === "tournament_2") {
		return (
			<Text as="p">Ev. Waldheim am Oberholz, Bartenhöhe 43, 73035 Göppingen</Text>
		);
	}

	if (value === "tournament_4") {
		return (
			<>
				<Text as="p">
					Tanzschule Plochingen, Esslinger Straße 14, 73207 Plochingen
				</Text>
				<Text as="p">
					<small>
						Der Eingang ist mit dem SVA-Masters Layout gekennzeichnet.
					</small>
				</Text>
			</>
		);
	}

	return (
		<Text as="p">Sporthalle Altbach, Esslinger Straße 90, 73776 Altbach</Text>
	);
}
