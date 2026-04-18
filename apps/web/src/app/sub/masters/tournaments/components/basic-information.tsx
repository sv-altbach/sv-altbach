import {Table, Text} from "@radix-ui/themes";

interface Props {
    value?: string;
}

export function BasicInformation({value}: Props) {
    return (
        <Table.Row>
            <Table.RowHeaderCell>Hinweise</Table.RowHeaderCell>
            <Table.Cell>
                <BasicInformationContent value={value}/>
            </Table.Cell>
        </Table.Row>
    );
}

function BasicInformationContent({value}: { value?: string }) {
    if (value === "tournament_4") {
        return (
            <>
                <Text as="p" mb="4">
                    <strong>Achtung:</strong> Während des gesamten Turniers und während den Spielen, läuft eine entspannte
                    Lounge-Hintergrundmusik.
                </Text>

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

    return <Text as="p">Keine Hinweise</Text>
}