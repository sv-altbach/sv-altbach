import { Container, Flex } from "@radix-ui/themes";
import About from "@/app/About";
import AddToCalendar from "@/app/AddToCalendar";
import Contact from "@/app/Contact";
import Footer from "@/app/Footer";
import Header from "@/app/Header";
import Sponsoring from "@/app/Sponsoring";
import Tournaments from "@/app/tournaments/Tournaments";

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
