import { Table, Text } from "@radix-ui/themes";

interface Props {
	value?: string;
}

function Venue({ value }: Props) {
	return (
		<Table.Row>
			<Table.RowHeaderCell>Spiellokal</Table.RowHeaderCell>
			<Table.Cell>{getVenue(value)}</Table.Cell>
		</Table.Row>
	);
}

function getVenue(value?: string) {
	if (value === "tournament_3") {
		return (
			<>
				<Text as="p">Haus der Jugend, Dürerstraße 21, 73033 Göppingen</Text>
				<Text as="p">
					<small>
						Der Eingang ist mit dem SVA-Masters Layout gekennzeichnet.
					</small>
				</Text>
			</>
		);
	}

	if (value === "tournament_5") {
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

export default Venue;
