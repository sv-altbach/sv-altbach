import { Box, Heading, Text } from "@radix-ui/themes";

export default function NewScoringSystemPage() {
	return (
		<main className="rounded-lg pb-6 shadow-xl lg:m-20">
			<Box
				px={{ initial: "5", lg: "9" }}
				pb="4"
				pt="6"
				className="rounded-t-lg bg-red-100 text-red-700"
			>
				<Heading as="h1" size={{ initial: "7", md: "8", lg: "9" }} mb="2">
					Neues Punktesystem
				</Heading>
				<Text as="p">
					Die SVA Masters bestehen aus mehreren eigenständigen Schachturnieren, die zu
					einer gemeinsamen Gesamtwertung zusammengefasst werden. Ziel ist es, gute
					Leistungen über mehrere Turniere hinweg zu belohnen und gleichzeitig ein
					schwaches oder verpasstes Turnier ausgleichen zu können.
				</Text>
			</Box>

			<Box px={{ initial: "5", lg: "9" }} py="4">
				<Heading as="h2" size={{ initial: "5", md: "6", lg: "8" }}>
					Punktevergabe pro Turnier
				</Heading>
				<Text as="p">
					Die Masters-Punkte eines Spielers ergeben sich aus seiner Leistung im jeweiligen
					Turnier.
				</Text>

				<Heading as="h3" size={{ initial: "3", md: "4", lg: "5" }} mt="3" mb="2">
					Formel
				</Heading>
				<Text as="p">
					<span className="rounded-lg bg-red-100 px-2 py-1 font-bold text-red-700">
						Masters-Punkte
					</span>{" "}
					= 100 × (erzielte Punkte / maximal erreichbare Punkte) × Turnierfaktor
				</Text>

				<Heading as="h3" size={{ initial: "3", md: "4", lg: "5" }} mt="3" mb="2">
					Erklärung
				</Heading>
				<ul className="list-disc pl-5">
					<li>
						<span className="font-bold text-neutral-700">Erzielte Punkte</span> = die im
						Turnier erreichten Punkte
					</li>
					<li>
						<span className="font-bold text-neutral-700">
							Maximal erreichbare Punkte
						</span>
						= Anzahl der Runden × Punkte im jeweiligen Wertungssystem
					</li>
					<li>
						<span className="font-bold text-neutral-700">100</span> = sorgt für eine gut
						lesbare Punkteskala
					</li>
					<li>
						<span className="font-bold text-neutral-700">Turnierfaktor</span> =
						berücksichtigt Größe und Stärke des Turniers
					</li>
				</ul>

				<Heading
					as="h3"
					size={{ initial: "3", md: "4", lg: "5" }}
					mt="3"
					id="tournamentFactor"
				>
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

			<Box px={{ initial: "5", lg: "9" }} py="4">
				<Heading as="h2" size={{ initial: "5", md: "6", lg: "8" }}>
					Gesamtwertung (Streichergebnis)
				</Heading>
				<Text as="p">
					Für die Masters-Gesamtwertung werden nicht alle Ergebnisse gewertet. Das
					schwächste Ergebnis jedes Spielers wird nach Abschluss der Qualifikation
					gestrichen.
				</Text>

				<Heading as="h3" size={{ initial: "3", md: "4", lg: "5" }} mt="3" mb="2">
					Regel
				</Heading>
				<ul className="list-disc pl-5">
					<li>Es finden fünf Qualifikationsturniere statt.</li>
					<li>
						Für jedes nicht gespielte Qualifikationsturnier werden in der Gesamtwertung
						0 Punkte angesetzt.
					</li>
					<li>
						Nach dem letzten Qualifikationsturnier wird das niedrigste Ergebnis jedes
						Spielers gestrichen.
					</li>
					<li>Bei fünf Qualifikationsturnieren zählen die besten vier Ergebnisse.</li>
					<li>
						Wer mehrere Turniere nicht spielt, kann nur eine dieser Nichtteilnahmen
						streichen. Weitere Nichtteilnahmen bleiben mit 0 Punkten in der Wertung.
					</li>
				</ul>

				<Heading as="h3" size={{ initial: "3", md: "4", lg: "5" }} mt="3" mb="2">
					Beispiel
				</Heading>
				<Text as="p" mb="2">
					Ein Spieler erreicht bei fünf Qualifikationsturnieren 80, 70, 60 und 50 Punkte
					und nimmt an einem Turnier nicht teil. Die Nichtteilnahme wird mit 0 Punkten
					gewertet und als schwächstes Ergebnis gestrichen.
				</Text>
				<Text as="p" mb="2">
					Für die Gesamtwertung zählen damit 80 + 70 + 60 + 50 = 260 Punkte.
				</Text>
				<Text as="p">
					Nimmt ein Spieler an zwei Turnieren nicht teil, kann nur eines der beiden
					Ergebnisse mit 0 Punkten gestrichen werden. Das andere bleibt Teil der
					Gesamtwertung.
				</Text>

				<Heading as="h3" size={{ initial: "3", md: "4", lg: "5" }} mt="3" mb="2">
					Ziel
				</Heading>
				<ul className="list-disc pl-5">
					<li>Ein einzelnes Top-Ergebnis entscheidet nicht die gesamte Serie.</li>
					<li>Ein schwaches oder verpasstes Turnier kann ausgeglichen werden.</li>
					<li>
						Für eine gute Gesamtplatzierung sind mehrere gute Ergebnisse erforderlich.
					</li>
					<li>
						Wer häufiger teilnimmt, hat mehr Möglichkeiten, ein schwächeres Ergebnis
						durch ein besseres zu ersetzen.
					</li>
				</ul>
			</Box>

			<Box px={{ initial: "5", lg: "9" }} py="4">
				<Heading as="h2" size={{ initial: "5", md: "6", lg: "8" }}>
					Finalqualifikation
				</Heading>
				<Text as="p">Am Ende der Serie findet ein Finale statt.</Text>

				<Heading as="h3" size={{ initial: "3", md: "4", lg: "5" }} mt="3">
					Voraussetzungen
				</Heading>
				<ul className="list-disc pl-5">
					<li>
						Teilnahme an{" "}
						<span className="font-bold text-neutral-700">
							mindestens drei Turnieren
						</span>
					</li>
					<li>
						Die besten 16 Spieler der Gesamtwertung, die an mindestens drei Turnieren
						teilgenommen haben, qualifizieren sich für das Finale.
					</li>
				</ul>

				<Heading as="h3" size={{ initial: "3", md: "4", lg: "5" }} mt="3">
					Finale
				</Heading>
				<ul className="list-disc pl-5">
					<li>Die besten Spieler der Serie treten im Finale gegeneinander an</li>
					<li>Im Finale werden zusätzliche Preise vergeben</li>
				</ul>
			</Box>
		</main>
	);
}
