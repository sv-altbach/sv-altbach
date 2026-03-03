"use client";

import {
	IconHourglass,
	IconId,
	IconMapPin,
	IconQuestionMark,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const infoItems = [
	{
		icon: IconId,
		title: "Wer",
		description:
			"Der Verein hat ca. 50 Mitglieder und zwei aktive Mannschaften.",
	},
	{
		icon: IconMapPin,
		title: "Wo",
		description: (
			<>
				Im Vereinszimmer der Sporthalle Esslinger Straße 90 neben dem
				Jugendhaus.{" "}
				<a
					href="https://goo.gl/maps/q8oHoAwkTJVwCZf49"
					target="_blank"
					rel="noopener noreferrer"
					className="text-primary hover:underline"
				>
					Routenplaner
				</a>
				.
			</>
		),
	},
	{
		icon: IconHourglass,
		title: "Wann",
		description:
			"Freitags 18:15 Uhr, Minis bis 19:15 Uhr, alle Übrigen bis 20:15 Uhr, danach ggf. freies Spiel/Analyse.",
	},
	{
		icon: IconQuestionMark,
		title: "Wie",
		description:
			"Entweder du kommst einfach am Freitagabend vorbei oder meldest dich per Mail.",
	},
];

export default function BasicInfoSection() {
	const handleScroll = () => {
		const element = document.querySelector("#contact");
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<section id="basicInfo" className="bg-white py-20">
			<div className="container mx-auto px-4">
				<p className="my-5 text-center text-muted-foreground italic">
					Seit 1969 agiert der Schachverein Altbach als selbstständiger Verein.
					Davor wurde schon 15 Jahre als Schachabteilung des VdK gespielt, seit
					2008 sind wir ein eingetragener Verein. Neben der Nachwuchsförderung
					haben sich auch unsere Turnier-Veranstaltungen etabliert.
				</p>

				<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
					{infoItems.map((item) => {
						const Icon = item.icon;
						return (
							<Card key={item.title} className="text-center">
								<CardHeader>
									<div className="mb-3 flex justify-center">
										<Icon className="h-8 w-8 text-primary" />
									</div>
									<CardTitle className="uppercase">{item.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-sm">
										{item.description}
									</CardDescription>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="mt-8 text-center">
					<Button className="uppercase" onClick={handleScroll}>
						Schreib uns
					</Button>
				</div>
			</div>
		</section>
	);
}
