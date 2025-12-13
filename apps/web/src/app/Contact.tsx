import { Heading, Text } from "@radix-ui/themes";

const Contact = () => {
	return (
		<>
			<section>
				<Heading size="8" mb="2" as="h2">
					Kontakt
				</Heading>
				<Text as="p">Du hast Fragen? Dann melde dich bei uns!</Text>
			</section>

			<section>
				<Heading as="h3" size="4">
					Adresse
				</Heading>
				<address className="not-italic">
					Esslinger Straße 90, 73776 Altbach, Deutschland
				</address>
			</section>

			<section>
				<Heading as="h3" size="4">
					Telefon <small>(Alexander Hande)</small>
				</Heading>
				<Text as="p">+49 (0) 152 0918 6437</Text>
			</section>

			<section>
				<Heading as="h3" size="4">
					E-Mail
				</Heading>
				<Text as="p">masters@svaltbach.de</Text>
			</section>
		</>
	);
};

export default Contact;
