import Link from "next/link";
import { SubdomainLink } from "@/components/subdomain-link";
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
    title: "SVA Masters Finale (Einladungsturnier)",
    details: [
      { label: "Wann?", value: "18.04.2026" },
      {
        label: "Wo?",
        value: (
            <address className="not-italic">
              Schachvereich Altbach e. V.
              <br />
              Esslinger Str. 90
              <br />
              73776 Altbach
            </address>
        ),
      },
      {
        label: "Wie?",
        value:
            "Finalturnier inkl. Elo-Auswertung. (Infos siehe Ausschreibung)",
      },
      {
        label: "Startgebühr",
        value: "Keine - Einladungsturnier",
      },
      {
        label: "Weitere Infos",
        value: (
            <>
              <p>Dies ist ein Einladungsturnier. Es sind nur die Finalisten der SVA Masters qualifiziert und zugelassen.</p>

              <Button
                  render={
                    <SubdomainLink
                        href="/"
                        subdomain="masters"
                        target="_blank"
                        rel="noopener noreferrer"
                    />
                  }
                  nativeButton={false}
              >
                Homepage SVA Masters
              </Button>
            </>
        ),
      },
    ],
  },
  {
    id: "ko-wam",
    title: "Altbacher ko-WAM",
    subtitle:
        "Turnier der Württembergischen Amateurmeisterschaft",
    details: [
      { label: "Wann?", value: "18.04.2026" },
      {
        label: "Wo?",
        value: (
            <address className="not-italic">
              Bürgerzentrum Altbach (Bücherei)
              <br />
              Kelterstr. 1 (am Marktplatz)
              <br />
              73776 Altbach
            </address>
        ),
      },
      {
        label: "Wie?",
        value: "Pokale für alle Gruppensieger, Medaillen für Platz 2 und 3, kleine Preise, mit DWZ-Auswertung",
      },
      {
        label: "Startgebühr",
        value: (
            <>
              <span><strong>15 €</strong> Frühbucher mit Voranmeldung bis 15.04.2026</span><br />
              <span><strong>18,00 €</strong> mit Voranmeldung bis 17.04.2026, 21:00 Uhr</span><br />
              <span><strong>20,00 €</strong> danach und am Turniertag</span>
            </>
        ),
      },
      {
        label: "Weitere Infos",
        value: (
            <Button
                render={
                  <Link
                      href="/root/docs/Ausschreibung_KO-WAM-Altbach_2026.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
            >
              Ausschreibung
            </Button>
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
					<Button
						render={
							<Link
								href="/root/docs/AUS-Altbacher Turniere_Schachzeitung_2026.pdf"
								target="_blank"
								rel="noopener noreferrer"
							/>
						}
						nativeButton={false}
					>
						Ausschreibung
					</Button>
				),
			},
		],
	},
];

export function TournamentsSection() {
	return (
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
												<TableHead className="w-32">{detail.label}</TableHead>
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
