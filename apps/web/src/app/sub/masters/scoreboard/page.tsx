import { Box, Button, Container, Heading, Tabs, Text } from "@radix-ui/themes";
import Link from "next/link";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import Footer from "@/app/Footer";
import Table from "@/app/sub/masters/scoreboard/components/Table";

const ScoreboardPage = () => {
	return (
		<>
			<section className="mx-5 my-20">
				<Container>
					<header>
						<Button variant="soft" mb="2" asChild>
							<Link href="/">Zurück</Link>
						</Button>

						<Heading as="h1" size="8">
							Scoreboard SVA Masters
						</Heading>

						<Text as="p" aria-hidden="true">
							Aktuelle Ranglisten-Tabelle der SVA Masters.
						</Text>

						<Text as="p" aria-hidden="true">
							Nach fünf Turnieren, werden die besten 16 Spieler, sowie Spieler,
							die an jedem Turnier mitgewirkt haben, für das Finale nominiert.
						</Text>

						<Text as="p" aria-hidden="true">
							Spieler, die neben ihrem Namen einen doppelten Pfeil nach oben
							haben
							<MdOutlineKeyboardDoubleArrowUp
								className="inline text-lg text-red-600"
								aria-hidden="true"
							/>
							, sind ebenfalls für das Finale qualifiziert.
						</Text>
					</header>

					<main className="my-10">
						<section className="my-10">
							<Heading as="h3" size="6" mb="2">
								Live Spiele
							</Heading>

							<p className="mb-4">
								In Turnier 5 (Chess960) wurden digitale Bretter verwendet. Du
								kannst dir jetzt alle Spiele, die mit diesen Brettern gespielt
								wurden, auf lichess.org nochmals ansehen.
							</p>

							<p className="my-4">
								Alle Spiele, die dort hochgeladen wurden, sind nicht auf
								lichess.org nicht gelistet und können nur über den unten
								stehenden Link aufgerufen werden.
							</p>

							<Button
								asChild
								className="cursor-pointer!"
								variant="solid"
								size="2"
								color="red"
								aria-label="Live-Spiele von Turnier 5 auf lichess.org ansehen"
							>
								<Link
									href="https://lichess.org/study/jyWjPTXd/J3FiRZpa#0"
									target="_blank"
									rel="noreferrer noopener"
								>
									Live-Spiele Turnier 5 auf lichess.org ansehen
								</Link>
							</Button>
						</section>

						<Tabs.Root defaultValue="player">
							<Tabs.List>
								<Tabs.Trigger value="player">Spieler</Tabs.Trigger>
								<Tabs.Trigger value="teams">Teams</Tabs.Trigger>
							</Tabs.List>

							<Box pt="3">
								<Tabs.Content value="player">
									<Table mode="player" />
								</Tabs.Content>

								<Tabs.Content value="teams">
									<Table mode="team" />
								</Tabs.Content>
							</Box>
						</Tabs.Root>
					</main>
				</Container>
			</section>

			<Footer />
		</>
	);
};

export default ScoreboardPage;
