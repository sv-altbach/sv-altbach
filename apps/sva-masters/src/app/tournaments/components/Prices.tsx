import {Table, Text} from "@radix-ui/themes";

interface Props {
  isFinalTournament: boolean;
  value?: string;
}

function Prices({isFinalTournament, value}: Props) {
  return (
      <Table.Row>
        <Table.RowHeaderCell width="250px">
          <Text as="p">Preise</Text>
          <Text as="p">
            {isFinalTournament ? (
                <small>
                  Keine Doppelpreise. Der höherwertige Preis wird ausgeschüttet. Als TWZ ziehen wir
                  die Blitzschach- bzw. Schnellschach-Elo heran.
                </small>
            ) : null}

            {value === "tournament_3" ? (
                <small>
                  <span aria-hidden="true">*</span> Zusatzpreise werden pro
                  Kategorie ab fünf Personen ausgeschüttet. Als TWZ ziehen wir
                  zuerst die Schnellschach-Elo heran. Wenn diese nicht vorhanden
                  ist, gilt die Standard-Elo und ansonsten die DWZ. Keine doppelten
                  Preise. Bei Punktgleichheit gilt die Buchholz Wertung.
                </small>
            ) : null}

            {!isFinalTournament && value !== "tournament_3" ? (
                <small>
                  <span aria-hidden="true">*</span> Preise werden pro Kategorie ab
                  fünf Personen ausgeschüttet. Als TWZ ziehen wir je nach Modus
                  zuerst die Schnellschach- bzw. Blitzschach-Elo heran. Wenn diese
                  nicht vorhanden ist, gilt die Standard-Elo und ansonsten die DWZ.
                </small>
            ) : null}
          </Text>
        </Table.RowHeaderCell>

        <Table.Cell className="space-y-5">
          <section>
            <Text as="p" size="3" className="font-bold">
              Hauptpreise
            </Text>

            {/*{isFinalTournament ? <Text as="p">Info bald verfügbar</Text> : null}*/}

            {isFinalTournament ? (
                <ul>
                  <li>Platz 1: 300 &euro; + Pokal</li>
                  <li>Platz 2: 200 &euro;</li>
                  <li>Platz 3: 100 &euro;</li>
                </ul>
            ) : null}

            {value === "tournament_3" ? (
                <ul>
                  <li>Platz 1: 300 &euro;</li>
                  <li>Platz 2: 250 &euro;</li>
                  <li>Platz 3: 200 &euro;</li>
                </ul>
            ) : null}

            {!isFinalTournament && value !== "tournament_3" ? (
                <ul>
                  <li>Platz 1: 150 &euro;</li>
                  <li>Platz 2: 75 &euro;</li>
                  <li>Platz 3: 50 &euro;</li>
                </ul>
            ) : null}
          </section>

          <section>
            <Text as="p" size="3" className="font-bold">
              Jugendpreise (U18) <span aria-hidden="true">*</span>
            </Text>

            {/*{isFinalTournament ? <Text as="p">Info bald verfügbar</Text> : null}*/}

            {isFinalTournament ? (
                <ul>
                  <li>Platz 1: 50 &euro;</li>
                  <li>Platz 2: 25 &euro;</li>
                </ul>
            ) : null}

            {value === "tournament_3" ? (
                <ul>
                  <li>Platz 1: 50 &euro;</li>
                  <li>Platz 2: 30 &euro;</li>
                </ul>
            ) : null}

            {!isFinalTournament && value !== "tournament_3" ? (
                <ul>
                  <li>Platz 1: 50 &euro;</li>
                  <li>Platz 2: 25 &euro;</li>
                </ul>
            ) : null}
          </section>

          {!isFinalTournament ? (
              <section>
                <Text as="p" size="3" className="font-bold">
                  Frauenpreis <span aria-hidden="true">*</span>
                </Text>

                {/*{isFinalTournament ? <Text as="p">Finale ohne </Text> : null}*/}

                {/*{isFinalTournament ? (*/}
                {/*    <ul>*/}
                {/*        <li>Platz 1: 60 &euro;</li>*/}
                {/*    </ul>*/}
                {/*) : null}*/}

                {value === "tournament_3" ? (
                    <ul>
                      <li>Platz 1: 50 &euro;</li>
                      <li>Platz 2: 30 &euro;</li>
                    </ul>
                ) : null}

                {!isFinalTournament && value !== "tournament_3" ? (
                    <ul>
                      <li>Platz 1: 50 &euro;</li>
                      <li>Platz 2: 25 &euro;</li>
                    </ul>
                ) : null}
              </section>
          ) : null}

          {value === "tournament_3" ? (
              <section>
                <Text as="p" size="3" className="font-bold">
                  Seniorenpreis <span aria-hidden="true">*</span>
                </Text>

                <ul>
                  <li>Platz 1: 50 &euro;</li>
                </ul>
              </section>
          ) : null}

          <section>
            <Text as="p" size="3" className="font-bold">
              TWZ Preise *
            </Text>

            {/*{isFinalTournament ? <Text as="p">Info bald verfügbar</Text> : null}*/}

            {isFinalTournament ? (
                <ul>
                  <li>TWZ {'< 2100'}: 60 &euro;</li>
                  <li>TWZ {'< 1850'}: 60 &euro;</li>
                </ul>
            ) : null}

            {!isFinalTournament ? (
                <ul>
                  <li>TWZ {"< 2000"}: 45 &euro;</li>
                  <li>TWZ {"< 1850"}: 45 &euro;</li>
                  <li>TWZ {"< 1700"}: 45 &euro;</li>
                  <li>TWZ {"< 1500"}: 45 &euro;</li>
                </ul>
            ) : null}
          </section>
        </Table.Cell>
      </Table.Row>
  );
}

export default Prices;
