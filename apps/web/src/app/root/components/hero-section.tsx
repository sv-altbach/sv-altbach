"use client";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
	const handleScroll = () => {
		const element = document.querySelector("#basicInfo");
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<section
			id="hero"
			className="flex min-h-screen items-center justify-center"
		>
			{/* Content */}
			<div className="container mx-auto px-4 text-center">
				<p className="mb-2 text-lg text-white/90 italic md:text-xl">
					Willkommen in unserem Verein
				</p>
				<h1 className="mb-6 font-bold text-4xl text-white md:text-6xl lg:text-7xl">
					Schachverein Altbach e.V.
				</h1>
				<Button size="xl" className="uppercase" onClick={handleScroll}>
					Über den Verein
				</Button>
			</div>
		</section>
	);
}
