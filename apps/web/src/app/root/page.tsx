import { AboutUsTimeline } from "./components/about-us-timeline";
import { BasicInfoSection } from "./components/basic-info-section";
import { BlogSection } from "./components/blog-section";
import { ContactForm } from "./components/contact-form";
import { HeroSection } from "./components/hero-section";
import { MembershipSection } from "./components/membership-section";
import { ScrollToTopButton } from "./components/scroll-to-top";
import { TournamentsSection } from "./components/tournaments-section";
import { TrainingSection } from "./components/training-section";

const SECTIONS = [
	{
		id: "hero",
		className:
			"relative flex min-h-screen items-center justify-center bg-gray-900",
		component: <HeroSection />,
	},
	{ id: "basicInfo", component: <BasicInfoSection /> },
	{ id: "aboutUs", component: <AboutUsTimeline /> },
	{ id: "training", component: <TrainingSection /> },
	{ id: "tournaments", component: <TournamentsSection /> },
	{ id: "costs", component: <MembershipSection /> },
	{ id: "blog", component: <BlogSection /> },
	{ id: "contact", component: <ContactForm /> },
];

export default function Site() {
	return (
		<div className="flex flex-col gap-y-20">
			{SECTIONS.map((section) => (
				<section
					key={section.id}
					id={section.id}
					className={section.className ?? "container mx-auto py-10 md:mx-10"}
				>
					{section.component}
				</section>
			))}
			<ScrollToTopButton className="fixed right-6 bottom-6 z-50" />
		</div>
	);
}
