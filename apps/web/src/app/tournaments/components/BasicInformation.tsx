import { Table, Text } from "@radix-ui/themes";

interface Props {
	withMusic?: boolean;
	value?: string;
}

function BasicInformation({ withMusic, value }: Props) {
	return (
		<Table.Row>
			<Table.RowHeaderCell>Hinweise</Table.RowHeaderCell>
			<Table.Cell>
				{getBasicInformation(value)}
				{getMusicInformation(withMusic, value)}
			</Table.Cell>
		</Table.Row>
	);
}

function getBasicInformation(value?: string) {
	if (value === "tournament_3") {
		return (
			<Text as="p">
				Durch eine Kooperation mit dem Schachverein Göppingen wird dieses
				Turnier als Teil der SVA Masters gewertet. Alle gesammelten Punkte
				fließen in die Gesamtwertung ein.
			</Text>
		);
	}

	if (value === "tournament_5") {
		return (
			<>
				<Text as="p" mb="4">
					Die Startposition jeder Runde wird direkt vor dem Partiebeginn
					bekanntgegeben.
				</Text>

				<Text as="p" mb="4">
					Neben dem Chess960 (Freestyle) wird es auch eine Cocktailbar geben und
					nach dem Turnier steht es jedem frei, einen gratis Tanzworkshop
					(Line-Dance, das geht auch ohne Partner) zu besuchen.
				</Text>
			</>
		);
	}
}

function getMusicInformation(withMusic?: boolean, value?: string) {
	if (value === "tournament_3") {
		return null;
	}

	return (
		<Text as="p">
			{withMusic
				? "Bitte beachte, dass während dieses Turniers Hintergrundmusik läuft."
				: "Keine Hinweise"}
		</Text>
	);
}

export default BasicInformation;
