import { Container, Flex } from "@radix-ui/themes";
import { About } from "./components/about";
import { AddToCalendar } from "./components/add-to-calendar";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Sponsoring } from "./components/sponsoring";
import { Tournaments } from "./tournaments/Tournaments";

export default function Home() {
	return (
		<section className="h-screen bg-center bg-cover bg-header bg-no-repeat">
			<Container m="0">
				<Flex
					className="h-screen space-y-5 p-5 text-center"
					asChild
					justify="center"
					align="center"
					direction="column"
				>
					<header>
						<Header />
					</header>
				</Flex>

				<article className="mx-10 my-20 space-y-10">
					<About />
				</article>

				<article className="mx-10 my-20">
					<AddToCalendar />
				</article>

				<article className="mx-10 my-20">
					<Tournaments />
				</article>

				<article className="mx-10 my-20">
					<Sponsoring />
				</article>

				<article className="mx-10 my-20 space-y-10">
					<Contact />
				</article>
			</Container>

			<Footer />
		</section>
	);
}
