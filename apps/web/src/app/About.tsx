import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import News from "@/components/News";
import { Button } from "@/components/ui/button";

export default function About() {
	return (
		<>
			<Flex
				asChild
				direction={{ initial: "column", md: "row" }}
				gap="8"
				justify="between"
			>
				<section>
					<Box>
						<Heading as="h2" size="8" mb="2">
							Änderungen der 2. Saison
						</Heading>

						<Box my="5">
							<News title="Teamwertung">
								<Text as="p" mb="2">
									In dieser Saison habt ihr die Möglichkeit,{" "}
									<strong>Teams zu bilden</strong> und gemeinsam Punkte für die
									Teamwertung zu sammeln. So funktioniert’s:
								</Text>

								<ul className="list-outside list-disc pl-5 [&_ul]:list-[revert]">
									<li>Ein Team kann zu jedem Zeitpunkt gegründet werden.</li>
									<li>
										Ein Team besteht aus bis zu <strong>drei Spielern</strong>,
										darunter mindestens:
										<ul className="pl-6">
											<li>
												Ein Spieler unter TWZ 2000 (Durchschnitt Blitz + Rapid)
											</li>
											<li>
												Ein Spieler unter TWZ 1750 (Durchschnitt Blitz + Rapid /
												bei 2er-Teams entfällt diese Vorgabe)
											</li>
										</ul>
									</li>
									<li>
										Ab der Bekanntgabe der Teamzusammensetzung zählen die
										Wertungspunkte der Spieler für die Teamwertung.
									</li>
								</ul>

								<Text as="p" mt="3">
									Das Team mit den meisten Punkten nach allen fünf
									Qualifikationsturnieren und dem Finalturnier erhält am Ende
									der Saison einen <strong>zusätzlichen Geldpreis</strong>.
									Überlegt euch also schon jetzt, mit wem ihr ein Team bilden
									wollt, um eure Chancen in der Teamwertung zu maximieren!
								</Text>
							</News>
						</Box>

						<Box my="5">
							<News title="Neue Qualifikationsmöglichkeit für das Finale">
								<Text as="p">
									Bisher war es nur möglich sich für das Finale zu qualifizieren
									wenn man unter den besten 16 Spielern gehörte. Ab dieser
									Saison ist es möglich sich auch für das Finale zu
									qualifizieren wenn man an allen fünf Qualifikationsturnieren
									mitgewirkt hat.
								</Text>
							</News>
						</Box>

						<Box my="5">
							<News title="Änderung der Hintergrundmusik">
								<Text as="p">
									Basierend auf eurem Feedback wird dieses Jahr die
									Hintergrundmusik angepasst. Wir werden diese Saison zwei
									Turniere mit Hintergrundmusik aber ohne Elo-Auswertung
									austragen und drei Turniere ohne Hintergrundmusik aber mit
									Elo-Auswertung. Das Finale wird ohne Hintergrundmusik und mit
									Elo-Auswertung ausgetragen.
								</Text>
							</News>
						</Box>

						<Box my="5">
							<News title="Einführung eines 960 Random Turniers">
								<Text as="p">
									Diese Saison wird zum ersten mal ein 960 Random Turnier teil
									der SVA Masters.
								</Text>
							</News>
						</Box>

						<Box my="5">
							<News title="Kooperation mit Göppingen">
								<Text as="p">
									Wir freuen uns, bekanntzugeben, dass wir in dieser Saison mit
									dem <strong>Schachverein Göppingen</strong> kooperieren! Ihr
									Rapid-Turnier im Mai wird Teil der SVA Masters Schachserie
									sein. Das bedeutet, dass ihr durch eure Teilnahme am Göppinger
									Turnier ebenfalls Punkte für die Gesamtwertung der SVA Masters
									sammeln könnt.
								</Text>
							</News>
						</Box>

						<Box my="5">
							<News title="Kooperation mit Plochingen">
								<Text as="p">
									Auch mit dem <strong>Schachverein Plochingen</strong> sind wir
									eine Kooperation eingegangen. Das fünfte Qualifikationsturnier
									wird in der <strong>Tanzschule in Plochingen</strong>{" "}
									ausgetragen und als <strong>960 Random Schachturnier</strong>{" "}
									organisiert. Dieses besondere Format sorgt für zusätzliche
									Abwechslung und spannende Partien, bei denen Kreativität und
									Flexibilität gefragt sind.
								</Text>
							</News>
						</Box>

						<Box my="5">
							<News title="Anzahl der Turniere">
								<Text as="p">
									In der zweiten Auflage der SVA Masters werden fünf statt vier
									Qualifikations-Turniere gespielt.
								</Text>
							</News>
						</Box>

						<Box my="5">
							<News title="Angepasster Turniermodus für die Rapid-Turniere">
								<Text as="p">
									In den Rapid-Turnieren werden nun neun Runden gespielt. Die
									Bedenkzeit ändert sich auf 12 Minuten + 3 Sekunden pro Zug je
									Spieler und Partie.
								</Text>
							</News>
						</Box>

						<Box my="5">
							<News title="Cocktailbar">
								<Text as="p">
									Das fünfte Qualifikationsturnier wird in der Tanzschule
									Plochingen ausgetragen. Dort wird es eine Cocktailbar geben.
								</Text>
							</News>
						</Box>
					</Box>

					<Box>
						<Heading as="h3" size="6" mb="2">
							Ehemalige Sieger
						</Heading>

						<Box className="h-fit rounded-md bg-red-50 p-5">
							<Grid
								asChild
								columns="repeat(2, 100px)"
								rows="2"
								gap="2"
								width="min-content"
							>
								<dl>
									<dt className="font-bold text-red-700">Name</dt>
									<dd>Tobias Kölle</dd>

									<dt className="font-bold text-red-700">Jahr</dt>
									<dd>2024</dd>
								</dl>
							</Grid>

							<Button
								render={
									<Link
										href="/finals/2024"
										target="_blank"
										rel="noreferrer noopener"
									/>
								}
								nativeButton={false}
								variant="default"
								aria-label="Ergebnisse in neuem Tab öffnen"
							>
								Ergebnisse
							</Button>
						</Box>
					</Box>
				</section>
			</Flex>

			<section>
				<Heading as="h3" size="6" mb="2">
					Wo?
				</Heading>

				<Grid
					columns={{ xs: "3" }}
					gap={{ initial: "6", xs: "3" }}
					width="auto"
				>
					<address className="not-italic">
						<strong>Sporthalle Altbach</strong> <br /> Esslinger Straße 90{" "}
						<br /> 73776 Altbach <br /> Deutschland
					</address>

					<address className="not-italic">
						<strong>Haus der Jugend</strong> <br /> Dürerstraße 21 <br /> 73033
						Göppingen <br /> Deutschland
					</address>

					<address className="not-italic">
						<strong>Tanzschule Plochingen</strong> <br /> Esslinger Straße 14{" "}
						<br /> 73207 Plochingen <br /> Deutschland
					</address>
				</Grid>
			</section>

			<section>
				<Heading as="h3" size="6" mb="2">
					Wann?
				</Heading>

				<ul>
					<li>
						<del>
							Freitag, 07. Februar 2025 <strong>(Blitz)</strong>
						</del>
					</li>
					<li>
						<del>
							Freitag, 28. März 2025 <strong>(Blitz)</strong>
						</del>
					</li>
					<li>
						<del>
							Sonntag, 25. Mai 2025 <strong>(Rapid)</strong>
							<em>- in Göppingen</em>
						</del>
					</li>
					<li>
						<del>
							Samstag, 12. Juli 2025 <strong>(Rapid)</strong>
						</del>
					</li>
					<li>
						<del>
							Samstag, 29. November 2025 <strong>(960 Random)</strong>
							<em>- in Plochingen</em>
						</del>
					</li>
					<li className="mt-5">
						<strong>Finale:</strong> 18. April 2026
						<br />
						<small>(Einladungsturnier)</small>
					</li>
				</ul>
			</section>
		</>
	);
}
