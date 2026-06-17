import { Box, Heading, Text } from "@radix-ui/themes";

export default function NewScoringSystemPage() {
	return (
		<main className="m-20 rounded-lg shadow-xl">
			<Box
				px="9"
				pb="4"
				pt="6"
				className="rounded-t-lg bg-red-100 text-red-700"
			>
				<Heading as="h1" size="9" mb="2">
					Neues Punktesystem
				</Heading>
				<Text as="p">
					Die SVA Masters bestehen aus mehreren eigenständigen Schachturnieren,
					die zu einer gemeinsamen Gesamtwertung zusammengefasst werden. Ziel
					ist es, sowohl Einzelleistungen als auch konstante Teilnahme über die
					Serie hinweg zu belohnen.
				</Text>
			</Box>

			<Box px="9" py="4">
				<Heading as="h2" size="8">
					Punktevergabe pro Turnier
				</Heading>
				<Text as="p">
					Die Masters-Punkte eines Spielers ergeben sich aus seiner Leistung im
					jeweiligen Turnier.
				</Text>

				<Heading as="h3" mt="3" mb="2">
					Formel
				</Heading>
				<Text as="p">
					<span className="rounded-lg bg-red-100 px-2 py-1 font-bold text-red-700">
						Masters-Punkte
					</span>{" "}
					= 100 × (erzielte Punkte / Rundenzahl) × Turnierfaktor
				</Text>

				<Heading as="h3" mt="3" mb="2">
					Erklärung
				</Heading>
				<ul className="list-disc pl-5">
					<li>
						<span className="font-bold text-neutral-700">
							Erzielte Punkte / Rundenzahl
						</span>{" "}
						= Punktequote im Turnier
					</li>
					<li>
						<span className="font-bold text-neutral-700">100</span> = sorgt für
						eine gut lesbare Punkteskala
					</li>
					<li>
						<span className="font-bold text-neutral-700">Turnierfaktor</span> =
						berücksichtigt Größe und Stärke des Turniers
					</li>
				</ul>

				<Heading as="h3" mt="3">
					Turnierfaktor
				</Heading>
				<Text as="p" mb="2">
					Der Turnierfaktor liegt in einem moderaten Bereich. Beispiel:
				</Text>
				<ul className="list-disc pl-5">
					<li>
						Turnierfaktor für ein Turnier bis 40 Teilnehmer ={" "}
						<span className="font-bold text-neutral-700">1,00</span>
					</li>
					<li>
						Turnierfaktor für ein Turnier mit 41 bis 70 Teilnehmern ={" "}
						<span className="font-bold text-neutral-700">1,05</span>
					</li>
					<li>
						Turnierfaktor für ein Turnier mit 71 bis 100 Teilnehmern ={" "}
						<span className="font-bold text-neutral-700">1,10</span>
					</li>
					<li>
						Turnierfaktor für ein Turnier ab 101 Teilnehmern ={" "}
						<span className="font-bold text-neutral-700">1,15</span>
					</li>
				</ul>
			</Box>

			<Box px="9" py="4">
				<Heading as="h2" size="8">
					Gesamtwertung (Streichergebnisse)
				</Heading>
				<Text as="p">
					Für die Masters-Gesamtwertung werden nicht alle Turniere gewertet.
				</Text>

				<Heading as="h3" mt="3" mb="2">
					Regel
				</Heading>
				<ul className="list-disc pl-5">
					<li>
						Es finden{" "}
						<span className="font-bold text-neutral-700">
							5 Qualifikationsturniere
						</span>{" "}
						statt
					</li>
					<li>
						Für die Gesamtwertung zählen die{" "}
						<span className="font-bold text-neutral-700">
							besten 4 Ergebnisse
						</span>
					</li>
					<li>Das schwächste Ergebnis wird gestrichen</li>
				</ul>

				<Heading as="h3" mt="3" mb="2">
					Ziel
				</Heading>
				<ul className="list-disc pl-5">
					<li>
						Ein einzelnes Top-Ergebnis entscheidet nicht die gesamte Serie
					</li>
					<li>Schwächere Turniere fallen weniger stark ins Gewicht</li>
					<li>Mehrere Teilnahmen werden belohnt</li>
				</ul>
			</Box>

			<Box px="9" py="4">
				<Heading as="h2" size="8">
					Finalqualifikation
				</Heading>
				<Text as="p">Am Ende der Serie findet ein Finale statt.</Text>

				<Heading as="h3" mt="3">
					Voraussetzungen
				</Heading>
				<ul className="list-disc pl-5">
					<li>
						Teilnahme an{" "}
						<span className="font-bold text-neutral-700">
							mindestens 3 Turnieren
						</span>
					</li>
					<li>Qualifikation über die Masters-Gesamtwertung</li>
				</ul>

				<Heading as="h3" mt="3">
					Finale
				</Heading>
				<ul className="list-disc pl-5">
					<li>
						Die besten Spieler der Serie treten im Finale gegeneinander an
					</li>
					<li>Im Finale werden zusätzliche Preise vergeben</li>
				</ul>
			</Box>
		</main>
	);
}
