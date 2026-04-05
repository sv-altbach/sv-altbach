import { AboutUsTimeline } from "./components/about-us-timeline";
import { BasicInfoSection } from "./components/basic-info";
import { BlogSection } from "./components/blog";
import { ContactSection } from "./components/contact-section";
import { HeroSection } from "./components/hero";
import { MembershipSection } from "./components/membership";
import { ScrollToTopButton } from "./components/scroll-to-top";
import { TournamentsSection } from "./components/tournaments";
import { TrainingSection } from "./components/training";

const SECTIONS = [
	{ id: "basicInfo", component: <BasicInfoSection /> },
	{ id: "aboutUs", component: <AboutUsTimeline /> },
	{ id: "training", component: <TrainingSection /> },
	{ id: "tournaments", component: <TournamentsSection /> },
	{ id: "costs", component: <MembershipSection /> },
	{ id: "blog", component: <BlogSection /> },
	{ id: "contact", component: <ContactSection /> },
];

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
						{section.component}
					</section>
				))}
			</div>
			<ScrollToTopButton className="fixed right-6 bottom-6 z-50" />
		</div>
	);
}
