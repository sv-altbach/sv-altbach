import { Container, Heading, Text } from "@radix-ui/themes";
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

						<Text as="p" aria-hidden="true">
							Aktuelle Ranglisten-Tabelle der SVA Masters.
						</Text>

						<Text as="p" aria-hidden="true" mb="5">
							Nach allen Qualifikations-Turnieren, werden die besten 16 Spieler, die
							an mindestens drei Turnieren teilgenommen haben, für das Finale
							nominiert.
						</Text>

						<Text as="p" aria-hidden="true">
							Spieler, die neben ihrem Namen einen doppelten Pfeil nach oben haben
							<IconArrowBadgeUp
								className="inline text-lg text-red-600"
								aria-hidden="true"
							/>
							, sind ebenfalls für das Finale qualifiziert.
						</Text>

						<Text as="p" aria-hidden="true">
							Spieler, die neben ihrem Namen ein
							<IconX className="inline text-lg text-red-600" aria-hidden="true" />
							haben, sind nicht für das Finale qualifiziert.
						</Text>

						<Text as="p" mt="5" mb="2">
							Jedes Turnier berechnet sich mit folgender Formel:
						</Text>

						<Text as="p">
							<span className="rounded-lg bg-red-100 px-2 py-1 font-bold text-red-700">
								Masters-Punkte
							</span>{" "}
							= 100 × (erzielte Punkte / maximal erreichbare Punkte) × Turnierfaktor
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
