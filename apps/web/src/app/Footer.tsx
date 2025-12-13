import {
	Container,
	Flex,
	Heading,
	Link,
	Separator,
	Text,
} from "@radix-ui/themes";

const Footer = () => {
	return (
		<footer className="bg-[#0D1321] p-10">
			<Container>
				<Flex
					className="text-white lg:mx-10"
					justify="between"
					gap="9"
					wrap="nowrap"
					direction={{ initial: "column", md: "row" }}
				>
					<section className="max-w-md">
						<Heading as="h2">SVA Masters</Heading>
						<Separator orientation="horizontal" size="4" color="red" />
						<Text as="p" mt="2">
							Die SVA Masters Turniere werden im Namen des Schachverein Altbach
							ausgerichtet. Sie wurden 2019 durch Alexander Hande und Alexander
							Muzenhardt ins Leben gerufen.
						</Text>
					</section>

					<section className="max-w-md">
						<Heading as="h2">Kontakt</Heading>
						<Separator orientation="horizontal" size="4" color="red" />
						<address className="mt-2 not-italic">
							Esslinger Straße 90 <br />
							73776 Altbach <br />
							Deutschland
						</address>

						<Text as="p">
							<span className="font-bold">
								Telefon <small>(Alexander Hande)</small>:
							</span>{" "}
							+49 (0) 152 0918 6437
						</Text>
						<Text as="p">
							<span className="font-bold">E-Mail:</span> masters@svaltbach.de
						</Text>
					</section>

					<section className="max-w-md">
						<Heading as="h2">Links</Heading>
						<Separator orientation="horizontal" size="4" color="red" />

						<ul className="mt-2">
							<li>
								<Link
									href="https://svaltbach.de/"
									target="_blank"
									rel="noreferrer noopener"
								>
									SV Altbach
								</Link>
							</li>
							<li>
								<Link
									href="https://svaltbach.de/impressum.html"
									target="_blank"
									rel="noreferrer noopener"
								>
									Impressum
								</Link>
							</li>
							<li>
								<Link
									href="https://svaltbach.de/datenschutz.html"
									target="_blank"
									rel="noreferrer noopener"
								>
									Datenschutz
								</Link>
							</li>
						</ul>
					</section>
				</Flex>
			</Container>
		</footer>
	);
};

export default Footer;
