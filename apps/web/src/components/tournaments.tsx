import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@sv-altbach/ui/components/accordion";
// import { Button } from "@sv-altbach/ui/components/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@sv-altbach/ui/components/table";

// const mastersUrl = import.meta.env.VITE_MASTERS_URL ?? "http://localhost:3001";

const tournaments: Tournament[] = [
	// {
	// 	id: "wam",
	// 	title: "WAM / WJPT / SSGT",
	// 	subtitle:
	// 		"Württembergische Amateur-Meisterschaft + Jugend-Pokal-Turnier + Schulschach-Grand-Prix-Turnier",
	// 	details: [
	// 		{ label: "Wann?", value: "14.06.2026" },
	// 		{
	// 			label: "Wo?",
	// 			value: (
	// 				<address className="not-italic">
	// 					Sporthalle
	// 					<br />
	// 					Esslinger Straße 90
	// 					<br />
	// 					73776 Altbach
	// 				</address>
	// 			),
	// 		},
	// 		{
	// 			label: "Wie?",
	// 			value: "mit Pokalen, teilweise mit DWZ-Auswertung und Sachpreisen",
	// 		},
	// 		{
	// 			label: "Startgebühr",
	// 			value: "15 € bei Voranmeldung bis 12.06. / danach 20 €",
	// 		},
	// 		{
	// 			label: "Weitere Infos",
	// 			value: (
	// 				<Button
	// 					render={
	// 						<a
	// 							href="/root/docs/AUS-Altbacher Turniere_Schachzeitung_2026.pdf"
	// 							target="_blank"
	// 							rel="noopener noreferrer"
	// 						>
	// 							Ausschreibung
	// 						</a>
	// 					}
	// 					nativeButton={false}
	// 				/>
	// 			),
	// 		},
	// 	],
	// },
];

export function TournamentsSection() {
	if (tournaments.length === 0) {
		return (
			<p className="text-md text-center leading-relaxed text-balance text-muted-foreground">
				Es gibt aktuell keine anstehenden Turniere.
			</p>
		);
	}

	return (
		<div className="mx-auto max-w-4xl">
			<Accordion defaultValue={["masters"]}>
				{tournaments.map((tournament) => (
					<AccordionItem key={tournament.id} value={tournament.id}>
						<AccordionTrigger>{tournament.title}</AccordionTrigger>
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
	);
}

interface Tournament {
	id: string;
	title: string;
	subtitle: string;
	details: {
		label: string;
		value: string | import("react").ReactElement;
	}[];
}
