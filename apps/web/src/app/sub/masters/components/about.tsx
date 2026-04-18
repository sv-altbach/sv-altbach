import {Box, Flex, Grid, Heading, Text, Button} from "@radix-ui/themes";
import {Link as RadixLink} from "@radix-ui/themes";
import Link from "next/link";
import {News} from "@/app/sub/masters/components/news";

export function About() {
    return (
        <Flex
                asChild
                direction={{initial: "column", md: "row"}}
                gap="8"
                justify="between"
            >
                <section>
                    <Box>
                        <Heading as="h2" size="8" mb="2">
                            Änderungen der 3. Saison
                        </Heading>

                        <Box my="5">
                            <News title="Teamwertung">
                                <Text as="p" mb="2">
                                    Eine Teamwertung wie im Vorjahr, wird es nicht mehr geben.
                                </Text>
                            </News>
                        </Box>

                        <Box my="5">
                            <News title="Neues Punktesystem">
                                <Text as="p">
                                    Um Turniere fairer zu gestalten, führen wir ein neues Punktesystem für die dritte
                                    Saison ein. Alle weiteren informationen findest du im Bereich{" "}
                                    <RadixLink
                                        href="/new-scoring-system"
                                        underline="always"
                                    >
                                        Neues Punktesystem
                                    </RadixLink>.
                                </Text>
                            </News>
                        </Box>

                        <Box my="5">
                            <News title="Änderung der Hintergrundmusik">
                                <Text as="p">
                                    Da wir für eine ELO-Auswertung keine Hintergrundmusik abspielen dürfen, werden in
                                    Zukunft alle Turniere ohne Hintergrundmusik stattfinden.
                                </Text>
                            </News>
                        </Box>

                        <Box my="5">
                            <News title="Kooperationen mit anderen Vereinen">
                                <Text as="p">
                                    Auch in Zukunft werden einige Turniere der SVA Masters von anderen Vereinen
                                    ausgetragen. Weitere Informationen findest du weiter unten im Abschnitt "Partner &
                                    Sponsoren".
                                </Text>
                            </News>
                        </Box>
                    </Box>

                    <Box>
                        <Heading as="h3" size="6" mb="2">
                            Ehemalige Sieger
                        </Heading>

                        <Box my="2" className="h-fit rounded-md bg-red-50 p-5">
                            <Grid
                                asChild
                                columns="repeat(2, 100px)"
                                rows="3"
                                gap="2"
                                width="min-content"
                            >
                                <dl>
                                    <dt className="font-bold text-red-700">Name</dt>
                                    <dd>Tobias Kölle</dd>

                                    <dt className="font-bold text-red-700">Jahr</dt>
                                    <dd>2024</dd>

                                    <dt className="font-bold text-red-700">Saison</dt>
                                    <dd>1. Saison</dd>
                                </dl>
                            </Grid>

                            <Button
                                mt="2"
                                aria-label="Ergebnisse 1. Saison in neuem Tab öffnen"
                                asChild
                            >
                                <Link
                                    href="/finals/2024"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    Ergebnisse 1. Saison
                                </Link>
                            </Button>
                        </Box>

                        <Box my="2" className="h-fit rounded-md bg-red-50 p-5">
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
                                    <dd>2026</dd>

                                    <dt className="font-bold text-red-700">Saison</dt>
                                    <dd>2. Saison</dd>
                                </dl>
                            </Grid>

                            <Button
                                mt="2"
                                aria-label="Ergebnisse 2. Saison in neuem Tab öffnen"
                                asChild
                            >
                                <Link
                                    href="/finals/2026"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    Ergebnisse 2. Saison
                                </Link>
                            </Button>
                        </Box>
                    </Box>
                </section>
            </Flex>
    );
}
