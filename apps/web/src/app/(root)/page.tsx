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
					className={
						section.className ?? "container mx-auto px-4 py-10 md:px-10"
					}
				>
					{section.component}
				</section>
			))}
			<ScrollToTopButton className="fixed right-6 bottom-6 z-50" />
		</div>
	);
}
