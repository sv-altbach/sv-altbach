import Image from "next/image";
import { AboutUsTimeline } from "./components/about-us-timeline";
import { BasicInfoSection } from "./components/basic-info-section";
import { BlogSection } from "./components/blog-section";
import { ContactForm } from "./components/contact-form";
import { HeroSection } from "./components/hero-section";
import { MembershipSection } from "./components/membership-section";
import { TournamentsSection } from "./components/tournaments-section";
import { TrainingSection } from "./components/training-section";

export default function RootPage() {
	return (
		<>
			<header className="relative bg-gray-900">
				{/* Background Image */}
				<div className="absolute inset-0 z-0">
					<Image
						src="/root/images/header-bg.jpg"
						alt=""
						fill
						className="object-cover opacity-60"
						priority
					/>
					<div className="absolute inset-0 bg-black/40" />
				</div>

				<div className="relative z-10">
					<HeroSection />
				</div>
			</header>
			<main>
				<BasicInfoSection />
				<AboutUsTimeline />
				<TrainingSection />
				<TournamentsSection />
				<MembershipSection />
				<BlogSection />
				<ContactForm />
			</main>
		</>
	);
}
