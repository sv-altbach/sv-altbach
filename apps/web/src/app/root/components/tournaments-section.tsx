import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const tournaments = [
	{
		id: "masters",
		title: "SVA Masters Serie",
		details: [
			{ label: "Wann?", value: "29.11.2025" },
			{
				label: "Wo?",
				value: (
					<address className="not-italic">
						Taplo (Tanzschule Plochingen)
						<br />
						Esslinger Str. 14
						<br />
						73207 Plochingen
					</address>
				),
			},
			{
				label: "Wie?",
				value:
					"mit Musik und anschließendem optionalem Single-Tanzkurs (Linedance)",
			},
			{
				label: "Startgebühr",
				value: "15 € bei Voranmeldung, 20 € am Turniertag",
			},
			{
				label: "Weitere Infos",
				value: (
					<a
						href="https://masters.svaltbach.de/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button>Homepage SVA Masters</Button>
					</a>
				),
			},
		],
	},
	{
		id: "wam",
		title: "WAM / WJPT / SSGT",
		subtitle:
			"Württembergische Amateur-Meisterschaft + Jugend-Pokal-Turnier + Schulschach-Grand-Prix-Turnier",
		details: [
			{ label: "Wann?", value: "14.06.2026" },
			{
				label: "Wo?",
				value: (
					<address className="not-italic">
						Sporthalle
						<br />
						Esslinger Straße 90
						<br />
						73776 Altbach
					</address>
				),
			},
			{
				label: "Wie?",
				value: "mit Pokalen, teilweise mit DWZ-Auswertung und Sachpreisen",
			},
			{
				label: "Startgebühr",
				value: "15 € bei Voranmeldung bis 12.06. / danach 20 €",
			},
			{
				label: "Weitere Infos",
				value: (
					<a
						href="/root/docs/AUS-Altbacher Turniere_Schachzeitung_2026.pdf"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button>Ausschreibung</Button>
					</a>
				),
			},
		],
	},
];

export default function TournamentsSection() {
	return (
		<section id="tournaments" className="bg-gray-50 py-20">
			<div className="container mx-auto px-4">
				<h2 className="mb-2 text-center font-bold text-3xl uppercase md:text-4xl">
					Turniere
				</h2>
				<p className="mb-10 text-center text-muted-foreground italic">
					Alles über unsere Turniere
				</p>

				<div className="mx-auto max-w-4xl">
					<Accordion defaultValue={["masters"]}>
						{tournaments.map((tournament) => (
							<AccordionItem key={tournament.id} value={tournament.id}>
								<AccordionTrigger className="font-semibold text-lg">
									{tournament.title}
								</AccordionTrigger>
								<AccordionContent>
									<div className="overflow-x-auto">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>#</TableHead>
													<TableHead>
														{tournament.subtitle || tournament.title}
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{tournament.details.map((detail) => (
													<TableRow key={detail.label}>
														<TableHead className="w-32">
															{detail.label}
														</TableHead>
														<TableCell>{detail.value}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
