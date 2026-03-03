import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

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
			<Link
				href="https://svw-schach.liga.nu/cgi-bin/WebObjects/nuLigaSCHACHDE.woa/wa/groupPage?championship=Neckar-Fils+24%2F25&group=1007"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				6. Platz
			</Link>
		),
		bKlasse: (
			<Link
				href="https://svw-schach.liga.nu/cgi-bin/WebObjects/nuLigaSCHACHDE.woa/wa/groupPage?championship=Neckar-Fils+24%2F25&group=1008"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				4. Platz
			</Link>
		),
	},
	{
		saison: "23/24",
		kreisklasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2023/3405/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				6. Platz
			</Link>
		),
		bKlasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2023/3409/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				3. Platz
			</Link>
		),
		cKlasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2023/3411/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				4. Platz
			</Link>
		),
	},
	{
		saison: "22/23",
		kreisklasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2022/3187/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				9. Platz
			</Link>
		),
		bKlasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2022/3191/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				3. Platz
			</Link>
		),
	},
	{
		saison: "21/22",
		kreisklasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2021/3009/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				5. Platz
			</Link>
		),
		aKlasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2021/3011/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				10. Platz
			</Link>
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
			<Link
				href="https://ergebnisse.svw.info/show/2019/2637/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				6. Platz
			</Link>
		),
		aKlasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2019/2639/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				9. Platz
			</Link>
		),
	},
	{
		saison: "18/19",
		kreisklasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2018/2409/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				6. Platz
			</Link>
		),
		bKlasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2018/2413/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				3. Platz
			</Link>
		),
	},
	{
		saison: "17/18",
		kreisklasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2017/2195/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				3. Platz
			</Link>
		),
		bKlasse: (
			<Link
				href="https://ergebnisse.svw.info/show/2017/2199/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				7. Platz
			</Link>
		),
	},
];

export default function MannschaftenPage() {
	return (
		<main className="min-h-screen bg-white pt-16">
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h1 className="mb-10 text-center font-bold text-3xl md:text-4xl">
						Mannschaften
					</h1>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-center">Saison</TableHead>
									<TableHead className="text-center">Landesliga</TableHead>
									<TableHead className="text-center">Bezirksliga</TableHead>
									<TableHead className="text-center" colSpan={2}>
										Kreisklasse
									</TableHead>
									<TableHead className="text-center" colSpan={2}>
										A-Klasse
									</TableHead>
									<TableHead className="text-center" colSpan={2}>
										B-Klasse
									</TableHead>
									<TableHead className="text-center" colSpan={3}>
										C-Klasse
									</TableHead>
									<TableHead className="text-center">D-Klasse</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{teamResults.map((result) => (
									<TableRow key={result.saison}>
										<TableCell className="text-center">
											{result.saison}
										</TableCell>
										<TableCell className="text-center">-</TableCell>
										<TableCell className="text-center">-</TableCell>
										<TableCell className="text-center" colSpan={2}>
											{result.kreisklasse || "-"}
										</TableCell>
										<TableCell className="text-center" colSpan={2}>
											{result.aKlasse || "-"}
										</TableCell>
										<TableCell className="text-center" colSpan={2}>
											{result.bKlasse || "-"}
										</TableCell>
										<TableCell className="text-center" colSpan={3}>
											{result.cKlasse || "-"}
										</TableCell>
										<TableCell className="text-center">-</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					<p className="mt-6 text-center text-muted-foreground text-sm">
						Historische Mannschaftsergebnisse des Schachverein Altbach e.V.
					</p>
				</div>
			</section>
		</main>
	);
}
