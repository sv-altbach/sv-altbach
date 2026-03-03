import { Table, Text } from "@radix-ui/themes";

interface Props {
	isFinalTournament: boolean;
	value: string;
}

export function EntryFees({ isFinalTournament, value }: Props) {
	return (
		<Table.Row>
			<Table.RowHeaderCell>Startgeld</Table.RowHeaderCell>
			<Table.Cell>
				<EntryFeeMarkup isFinalTournament={isFinalTournament} value={value} />
			</Table.Cell>
		</Table.Row>
	);
}

function EntryFeeMarkup({
	isFinalTournament,
	value,
}: {
	isFinalTournament: boolean;
	value: string;
}) {
	if (isFinalTournament) {
		return <Text as="p">Einladungsturnier. Startgeld entfällt.</Text>;
	}

	if (value === "tournament_3") {
		return (
			<>
				<Text as="p">
					Voranmeldung: <strong>20 &euro;</strong>
				</Text>
				<Text as="p">
					Anmeldungen am Turniertag vor Ort: <strong>25 &euro;</strong>
				</Text>
			</>
		);
	}

	return (
		<>
			<Text as="p">
				Voranmeldung: <strong>15 &euro;</strong>
			</Text>
			<Text as="p">
				Anmeldungen am Turniertag vor Ort: <strong>20 &euro;</strong>
			</Text>
		</>
	);
}
