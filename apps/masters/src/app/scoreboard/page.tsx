import { Badge, Container, Heading, Link as RadixLink, Text } from "@radix-ui/themes";
import { Button } from "@sv-altbach/ui/components/button";
import { IconArrowBadgeUp, IconX } from "@tabler/icons-react";
import Link from "next/link";

import { Table } from "@/app/scoreboard/components/Table";

import { Footer } from "../components/footer";

const ScoreboardPage = () => {
	return (
		<>
			<section className="mx-5 my-20">
				<Container>
					<header>
						<Button
							render={<Link href="/">Zurück</Link>}
							nativeButton={false}
							variant="soft"
							className="mb-2"
						/>

						<Heading as="h1" size="8" mb="4">
							Scoreboard SVA Masters
						</Heading>

						<Text as="p">
							Die Rangliste zeigt die aktuelle Gesamtwertung der SVA Masters.
						</Text>

						<Text as="p" mt="2">
							Nach Abschluss aller Qualifikationsturniere wird bei jedem Spieler das
							schwächste Ergebnis gestrichen. Eine Nichtteilnahme wird dabei mit 0
							Punkten gewertet und kann als Streichergebnis dienen.
						</Text>

						<Text as="p" mt="2">
							Bei fünf Qualifikationsturnieren zählen die besten vier Ergebnisse.
						</Text>

						<Text as="p" mt="2" mb="5">
							Die besten 16 Spieler der Gesamtwertung, die an mindestens drei
							Qualifikationsturnieren teilgenommen haben, qualifizieren sich für das
							Finale.
						</Text>

						<Text as="p">
							Spieler, die neben ihrem Namen einen doppelten Pfeil nach oben haben
							<IconArrowBadgeUp
								className="inline text-lg text-primary"
								aria-hidden="true"
							/>
							, sind ebenfalls für das Finale qualifiziert.
						</Text>

						<Text as="p" aria-hidden="true">
							Spieler, die neben ihrem Namen ein
							<IconX className="inline text-lg text-primary" aria-hidden="true" />
							haben, sind nicht für das Finale qualifiziert.
						</Text>

						<Text as="p" mt="2">
							Ein Strich in einer Turnierspalte bedeutet, dass kein Ergebnis vorliegt.
							Nach Abschluss des Turniers zählt eine Nichtteilnahme intern mit 0
							Punkten.
						</Text>

						<Text as="p" mt="5" mb="2">
							Jedes Turnier berechnet sich mit folgender Formel:
						</Text>

						<Text as="p">
							<Badge size="2">Masters-Punkte</Badge> = 100 × (erzielte Punkte /
							maximal erreichbare Punkte) ×{" "}
							<RadixLink asChild underline="always">
								<Link href="/new-scoring-system#tournamentFactor">
									Turnierfaktor
								</Link>
							</RadixLink>
						</Text>

						<Text as="p" my="2">
							Um die genaue Zusammensetzung der Punkte für das einzelne Turnier zu
							sehen, klicke auf deine Punkte in der Tabelle.
						</Text>
					</header>

					<main className="my-10">
						<Table />
					</main>
				</Container>
			</section>

			<Footer />
		</>
	);
};

export default ScoreboardPage;
