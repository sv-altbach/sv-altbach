"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const membershipPlans = [
	{
		title: "Aktive Mitgliedschaft",
		subtitle: "Jedermann",
		price: "60",
		features: [
			"Wöchentliches Training",
			"Lernmaterial für die Jugend",
			"Keine Startgebühr bei einigen Altbacher Turnieren",
		],
	},
	{
		title: "Ermäßigt",
		subtitle: "Nur nach Genehmigung des Vorstandes",
		price: "30",
		features: [
			"Wöchentliches Training",
			"Lernmaterial für die Jugend",
			"Keine Startgebühr bei einigen Altbacher Turnieren",
		],
	},
];

export default function MembershipSection() {
	const handleScroll = () => {
		const element = document.querySelector("#contact");
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<section id="costs" className="bg-white py-20">
			<div className="container mx-auto px-4">
				<h2 className="mb-2 text-center font-bold text-3xl uppercase md:text-4xl">
					Mitgliedschaft
				</h2>
				<p className="mb-10 text-center text-muted-foreground italic">
					Alles über unsere Mitgliedschaftsgebühren
				</p>

				<div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
					{membershipPlans.map((plan) => (
						<Card key={plan.title} className="flex h-full flex-col">
							<CardHeader className="text-center">
								<CardTitle>{plan.title}</CardTitle>
								<CardDescription>{plan.subtitle}</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-1 flex-col text-center">
								<div className="mb-6">
									<span className="font-bold text-4xl">{plan.price} €</span>
									<span className="text-muted-foreground"> / Jahr</span>
								</div>
								<ul className="mb-6 space-y-2 text-left">
									{plan.features.map((feature) => (
										<li key={feature} className="flex items-start">
											<span className="mr-2">•</span>
											<span>{feature}</span>
										</li>
									))}
								</ul>
								<Button className="w-full uppercase" onClick={handleScroll}>
									Kontakt
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
