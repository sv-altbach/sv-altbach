import { AboutUsTimeline } from "./components/about-us-timeline";
import { BasicInfoSection } from "./components/basic-info";
import { BlogSection } from "./components/blog";
import { ContactForm } from "./components/contact-form";
import { HeroSection } from "./components/hero";
import { MembershipSection } from "./components/membership";
import { ScrollToTopButton } from "./components/scroll-to-top";
import { TournamentsSection } from "./components/tournaments";
import { TrainingSection } from "./components/training";

const SECTIONS = [
	{ id: "basicInfo", component: <BasicInfoSection /> },
	{
		id: "aboutUs",
		header: {
			heading: "Über uns",
			subtitle: "Ein Verein mit Tradition",
		},
		component: <AboutUsTimeline />,
	},
	{
		id: "training",
		header: {
			heading: "Training",
			subtitle: "Unser Training, abgestimmt auf dich",
		},
		component: <TrainingSection />,
	},
	{
		id: "tournaments",
		header: {
			heading: "Turniere",
			subtitle: "Alles über unsere Turniere",
		},
		component: <TournamentsSection />,
	},
	{
		id: "membership",
		header: {
			heading: "Mitgliedschaft",
			subtitle: "Alles über unsere Mitgliedschaftsgebühren",
		},
		component: <MembershipSection />,
	},
	{
		id: "blog",
		header: {
			heading: "Blog",
			subtitle: "Die neuesten Artikel vom Verein",
		},
		component: <BlogSection />,
	},
	{
		id: "contact",
		header: {
			heading: "Kontakt",
			subtitle: "Schreib uns eine Nachricht",
		},
		component: <ContactForm />,
	},
];

function SectionHeader({
	heading,
	subtitle,
}: {
	heading: string;
	subtitle: string;
}) {
	return (
		<header>
			<h2 className="mb-2 text-balance text-center font-bold text-3xl uppercase md:text-4xl">
				{heading}
			</h2>
			<p className="mb-10 text-balance text-center text-muted-foreground italic">
				{subtitle}
			</p>
		</header>
	);
}

export default function Site() {
	return (
		<div className="flex flex-col gap-20">
			<section
				id="hero"
				className="relative flex min-h-screen items-center justify-center bg-gray-900"
			>
				<HeroSection />
			</section>
			<div className="container mx-auto mb-30 flex flex-col gap-30 px-4 md:px-10">
				{SECTIONS.map((section) => (
					<section key={section.id} id={section.id}>
						{section.header && <SectionHeader {...section.header} />}
						{section.component}
					</section>
				))}
			</div>
			<ScrollToTopButton className="fixed right-6 bottom-6 z-50" />
		</div>
	);
}
