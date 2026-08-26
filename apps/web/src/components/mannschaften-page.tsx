import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@sv-altbach/ui/components/table";

// Simplified data - in production, this would come from a data file
const teamResults = [
	{
		saison: "25/26",
		kreisklasse: "1. Mannschaft",
		bKlasse: "2. Mannschaft",
	},
	{
		saison: "24/25",
		kreisklasse: (
			<a
				href="https://svw-schach.liga.nu/cgi-bin/WebObjects/nuLigaSCHACHDE.woa/wa/groupPage?championship=Neckar-Fils+24%2F25&group=1007"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				6. Platz
			</a>
		),
		bKlasse: (
			<a
				href="https://svw-schach.liga.nu/cgi-bin/WebObjects/nuLigaSCHACHDE.woa/wa/groupPage?championship=Neckar-Fils+24%2F25&group=1008"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				4. Platz
			</a>
		),
	},
	{
		saison: "23/24",
		kreisklasse: (
			<a
				href="https://ergebnisse.svw.info/show/2023/3405/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				6. Platz
			</a>
		),
		bKlasse: (
			<a
				href="https://ergebnisse.svw.info/show/2023/3409/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				3. Platz
			</a>
		),
		cKlasse: (
			<a
				href="https://ergebnisse.svw.info/show/2023/3411/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				4. Platz
			</a>
		),
	},
	{
		saison: "22/23",
		kreisklasse: (
			<a
				href="https://ergebnisse.svw.info/show/2022/3187/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				9. Platz
			</a>
		),
		bKlasse: (
			<a
				href="https://ergebnisse.svw.info/show/2022/3191/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				3. Platz
			</a>
		),
	},
	{
		saison: "21/22",
		kreisklasse: (
			<a
				href="https://ergebnisse.svw.info/show/2021/3009/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				5. Platz
			</a>
		),
		aKlasse: (
			<a
				href="https://ergebnisse.svw.info/show/2021/3011/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				10. Platz
			</a>
		),
	},
	{
		saison: "20/21",
		kreisklasse: "Corona-Pause",
		aKlasse: "Corona-Pause",
	},
	{
		saison: "19/20",
		kreisklasse: (
			<a
				href="https://ergebnisse.svw.info/show/2019/2637/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				6. Platz
			</a>
		),
		aKlasse: (
			<a
				href="https://ergebnisse.svw.info/show/2019/2639/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				9. Platz
			</a>
		),
	},
	{
		saison: "18/19",
		kreisklasse: (
			<a
				href="https://ergebnisse.svw.info/show/2018/2409/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				6. Platz
			</a>
		),
		bKlasse: (
			<a
				href="https://ergebnisse.svw.info/show/2018/2413/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				3. Platz
			</a>
		),
	},
	{
		saison: "17/18",
		kreisklasse: (
			<a
				href="https://ergebnisse.svw.info/show/2017/2195/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				3. Platz
			</a>
		),
		bKlasse: (
			<a
				href="https://ergebnisse.svw.info/show/2017/2199/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				7. Platz
			</a>
		),
	},
];

export function MannschaftenPage() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<h1 className="mb-10 text-center text-3xl font-bold text-balance md:text-4xl">
					Mannschaften
				</h1>
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-center text-balance">Saison</TableHead>
								<TableHead className="text-center text-balance">
									Landesliga
								</TableHead>
								<TableHead className="text-center text-balance">
									Bezirksliga
								</TableHead>
								<TableHead className="text-center text-balance" colSpan={2}>
									Kreisklasse
								</TableHead>
								<TableHead className="text-center text-balance" colSpan={2}>
									A-Klasse
								</TableHead>
								<TableHead className="text-center text-balance" colSpan={2}>
									B-Klasse
								</TableHead>
								<TableHead className="text-center text-balance" colSpan={3}>
									C-Klasse
								</TableHead>
								<TableHead className="text-center text-balance">D-Klasse</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{teamResults.map((result) => (
								<TableRow key={result.saison}>
									<TableCell className="text-center text-balance">
										{result.saison}
									</TableCell>
									<TableCell className="text-center text-balance">-</TableCell>
									<TableCell className="text-center text-balance">-</TableCell>
									<TableCell className="text-center text-balance" colSpan={2}>
										{result.kreisklasse || "-"}
									</TableCell>
									<TableCell className="text-center text-balance" colSpan={2}>
										{result.aKlasse || "-"}
									</TableCell>
									<TableCell className="text-center text-balance" colSpan={2}>
										{result.bKlasse || "-"}
									</TableCell>
									<TableCell className="text-center text-balance" colSpan={3}>
										{result.cKlasse || "-"}
									</TableCell>
									<TableCell className="text-center text-balance">-</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<p className="mt-6 text-center text-sm text-balance text-muted-foreground">
					Historische Mannschaftsergebnisse des Schachverein Altbach e.V.
				</p>
			</div>
		</section>
	);
}
