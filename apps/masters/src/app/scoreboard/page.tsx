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
							render={<Link href="/" />}
							nativeButton={false}
							variant="soft"
							className="mb-2"
						>
							Zurück
						</Button>

						<Heading as="h1" size="8" mb="4">
							Scoreboard SVA Masters
						</Heading>

						<Text as="p" aria-hidden="true">
							Aktuelle Ranglisten-Tabelle der SVA Masters.
						</Text>

						<Text as="p" aria-hidden="true">
							Nach allen Qualifikations-Turnieren, werden die besten 16 Spieler,
							die an mindestens drei Turnieren teilgenommen haben, für das
							Finale nominiert.
						</Text>

						<Text as="p" aria-hidden="true">
							Spieler, die neben ihrem Namen einen doppelten Pfeil nach oben
							haben
							<IconArrowBadgeUp
								className="inline text-lg text-red-600"
								aria-hidden="true"
							/>
							, sind ebenfalls für das Finale qualifiziert.
						</Text>

						<Text as="p" aria-hidden="true">
							Spieler, die neben ihrem Namen ein
							<IconX
								className="inline text-lg text-red-600"
								aria-hidden="true"
							/>
							haben, sind nicht für das Finale qualifiziert.
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
