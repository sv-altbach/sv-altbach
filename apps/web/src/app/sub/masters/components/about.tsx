import {Box, Flex, Grid, Heading, Text, Button} from "@radix-ui/themes";
import {Link as RadixLink} from "@radix-ui/themes";
import Link from "next/link";
import {News} from "@/app/sub/masters/components/news";

export function About() {
    return (
        <>
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
                                mt="2"
                                aria-label="Ergebnisse in neuem Tab öffnen"
                                asChild
                            >
                                <Link
                                    href="/finals/2024"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    Ergebnisse
                                </Link>
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
                    columns={{xs: "3"}}
                    gap={{initial: "6", xs: "3"}}
                    width="auto"
                >
                    <address className="not-italic">
                        <strong>Sporthalle Altbach</strong> <br/> Esslinger Straße 90{" "}
                        <br/> 73776 Altbach <br/> Deutschland
                    </address>

                    <address className="not-italic">
                        <strong>Haus der Jugend</strong> <br/> Dürerstraße 21 <br/> 73033
                        Göppingen <br/> Deutschland
                    </address>

                    <address className="not-italic">
                        <strong>Tanzschule Plochingen</strong> <br/> Esslinger Straße 14{" "}
                        <br/> 73207 Plochingen <br/> Deutschland
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
                        <br/>
                        <small>(Einladungsturnier)</small>
                    </li>
                </ul>
            </section>
        </>
    );
}
