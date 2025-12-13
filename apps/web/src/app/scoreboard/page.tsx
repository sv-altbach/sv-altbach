import { Box, Button, Container, Heading, Tabs, Text } from "@radix-ui/themes";
import Link from "next/link";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import Footer from "@/app/Footer";
import Table from "@/app/scoreboard/components/Table";

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
