import {
  Button,
  Container,
  Heading,
  Table as RadixTable,
  Table
} from "@radix-ui/themes";
import {cn} from "@sv-altbach/ui/lib/utils";
import Link from "next/link";
import {Fragment} from "react";
import {getTournamentResults} from "@/app/finals/2026/utils/getTournamentResults";
import {getPlayerName} from "@/utils/utils";

export default function Final2026() {
  const results = getTournamentResults();

  return (
      <section className="mx-5 my-20">
        <Container>
          <header>
            <Button variant="soft" mb="2" asChild>
              <Link href="/">Zurück</Link>
            </Button>

            <Heading as="h1" size="8">
              Ergebnisse SVA Masters Finale 2026
            </Heading>
          </header>

          <main className="my-10">
            {results.map((tournament) => (
                <Fragment key={tournament.id}>
                  {tournament.id === "0_winner_top.json" && (
                      <Heading as="h2">
                        SVA-Masters, Finale, Gesamtergebnisse obere Tabellenhälfte
                      </Heading>
                  )}

                  {tournament.id === "1_winner_bottom.json" && (
                      <Heading as="h2">
                        SVA-Masters, Finale, Gesamtergebnisse untere Tabellenhälfte
                      </Heading>
                  )}

                  <RadixTable.Root variant="surface" mt="2" mb="8">
                    <caption className="sr-only">
                      {tournament.id === "0_winner_top.json" &&
                          "SVA-Masters, Finale, Gesamtergebnisse obere Tabellenhälfte nach KO-Phase"}
                      {tournament.id === "1_winner_bottom.json" &&
                          "SVA-Masters, Finale, Gesamtergebnisse untere Tabellenhälfte nach KO-Phase"}
                    </caption>

                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>Position</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Spieler</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify="center">
                          Gewonnen
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify="center">
                          Remis
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify="center">
                          Verloren
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify="center">
                          Punkte
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell justify="center">
                          Buchholz
                        </Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {tournament.data.map((player) => (
                          <Table.Row
                              key={player.name}
                              className={cn([
                                player.position === 1 && "bg-[#FFD700]",
                                player.position === 2 && "bg-[#C0C0C0]",
                                player.position === 3 && "bg-[#CD7F32]",
                              ])}
                          >
                            <Table.RowHeaderCell>
                              {player.position}
                            </Table.RowHeaderCell>
                            <Table.Cell>{getPlayerName(player.name)}</Table.Cell>
                            <Table.Cell justify="center">{player.wins}</Table.Cell>
                            <Table.Cell justify="center">{player.remis}</Table.Cell>
                            <Table.Cell justify="center">{player.lost}</Table.Cell>
                            <Table.Cell justify="center">{player.points}</Table.Cell>
                            <Table.Cell justify="center">
                              {player.buchholz}
                            </Table.Cell>
                          </Table.Row>
                      ))}
                    </Table.Body>
                  </RadixTable.Root>
                </Fragment>
            ))}
          </main>
        </Container>
      </section>
  );
}
