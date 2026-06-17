import { Table, Text } from "@radix-ui/themes";
import type { TournamentDataTypes } from "@/types";

export function EntryFees({ tournament }: Props) {
	return (
		<Table.Row>
			<Table.RowHeaderCell>Startgeld</Table.RowHeaderCell>
			<Table.Cell>
				<EntryFeeMarkup tournament={tournament} />
			</Table.Cell>
		</Table.Row>
	);
}

function EntryFeeMarkup({ tournament }: Props) {
	if (!tournament.entryFee) {
		return "Höhe des Startgelds wird bald bekanntgegeben.";
	}

	if (tournament.type === "final") {
		return "Einladungsturnier. Startgeld entfällt.";
	}

	return (
		<>
			<Text as="p">
				Voranmeldung:{" "}
				<strong>{tournament.entryFee?.preRegistration} &euro;</strong>
			</Text>
			<Text as="p">
				Anmeldungen am Turniertag vor Ort:{" "}
				<strong>{tournament.entryFee?.normalRegistration} &euro;</strong>
			</Text>
		</>
	);
}

interface Props {
	tournament: TournamentDataTypes;
}
