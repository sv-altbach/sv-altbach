import { Button, Container, Heading } from "@radix-ui/themes";
import Link from "next/link";

export default function Final2026() {
	return (
		<section className="mx-5 my-20">
			<Container>
				<header>
					<Button asChild variant="soft" className="mb-2">
						<Link href="/">Zurück</Link>
					</Button>

					<Heading as="h1" size="8">
						Ergebnisse SVA Masters Finale 2026
					</Heading>
				</header>

				<main className="my-10">
					Ergebnisse werden in Kürze veröffentlicht.
				</main>
			</Container>
		</section>
	);
}
