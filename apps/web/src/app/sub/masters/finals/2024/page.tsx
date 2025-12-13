import {
	Container,
	Heading,
	Table as RadixTable,
	Table,
	Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/ui";
import { getPlayerName } from "@/utils/utils";
import { getTournamentResults } from "./utils/getTournamentResults";

const Final2024 = () => {
	const results = getTournamentResults();

	return (
		<section className="mx-5 my-20">
			<Container>
				<header>
					<Button
						render={<Link href="/" />}
						nativeButton={false}
						variant="soft"
						className="mb-2"
					>
						Zurück
					</Button>

					<Heading as="h1" size="8">
						Ergebnisse SVA Masters Finale 2024
					</Heading>
				</header>

				<main className="my-10">
					{results.map((tournament, index) => (
						<Fragment key={tournament.id}>
							{index === 0 && (
								<>
									<Heading as="h2">
										SVA-Masters, Finale, Gesamtergebnisse aus Blitz- und
										Schnellschach
									</Heading>
									<Text as="p">
										23.06.2024, 7 Runden Schweizer-System, 3 + 2 und 10 + 5
										Minuten Bedenkzeit
									</Text>
								</>
							)}

							{index === 1 && (
								<>
									<Heading as="h2">SVA-Masters, Finale, Blitzschach</Heading>
									<Text as="p">
										23.06.2024, 7 Runden Schweizer-System, 3 + 2 Minuten
										Bedenkzeit
									</Text>
								</>
							)}

							{index === 2 && (
								<>
									<Heading as="h2">SVA-Masters, Finale, Schnellschach</Heading>
									<Text as="p">
										23.06.2024, 7 Runden Schweizer-System, 10 + 5 Minuten
										Bedenkzeit
									</Text>
								</>
							)}

							<RadixTable.Root variant="surface" mt="2" mb="8">
								<caption className="sr-only">
									{index === 0 &&
										"Tabelle der Gesamt-Ergebnisse aus beiden Final-Turnieren."}
									{index === 1 &&
										"Tabelle der Blitzschach-Ergebnisse des Finales."}
									{index === 2 &&
										"Tabelle der Schnellschach-Ergebnisse des Finales."}
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
};

export default Final2024;
