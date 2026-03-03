import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

// Simplified data structure with recent winners
const winners = [
	{
		year: "2025",
		vereinsmeister: (
			<Link
				href="https://svaltbach-blog.tumblr.com/post/781201425251368960/endstand-der-vereinsmeisterschaften-202425"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</Link>
		),
		pokalsieger: "23.05.2025",
		bernhardFreyPokal: "Michail Charalambakis",
		jugendmeister: (
			<Link
				href="https://svaltbach-blog.tumblr.com/post/781201425251368960/endstand-der-vereinsmeisterschaften-202425"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</Link>
		),
		blitzmeister: "19.12.2025",
		jugendBlitzmeister: "19.12.2025",
	},
	{
		year: "2024",
		vereinsmeister: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/748222039706550272/ergebnisse-vereinsturnier-und-jugendmeisterschaft?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alexander Hande
			</Link>
		),
		pokalsieger: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/757283523953623040/r%C3%BCckblick-auf-die-letzten-monate?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Berra Elmas
			</Link>
		),
		bernhardFreyPokal: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/757283523953623040/r%C3%BCckblick-auf-die-letzten-monate?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Berra Elmas
			</Link>
		),
		jugendmeister: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/748222039706550272/ergebnisse-vereinsturnier-und-jugendmeisterschaft?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Berra Elmas
			</Link>
		),
		blitzmeister: (
			<Link
				href="https://svaltbach-blog.tumblr.com/post/773733713631756288/was-in-letzter-zeit-geschah"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alexander Hande
			</Link>
		),
		jugendBlitzmeister: (
			<Link
				href="https://svaltbach-blog.tumblr.com/post/773733713631756288/was-in-letzter-zeit-geschah"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</Link>
		),
	},
	{
		year: "2023",
		vereinsmeister: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/718689775244181504/endstand-vereinsmeisterschaften-inkl-jugend?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alexander Hande
			</Link>
		),
		pokalsieger: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/721128082479661056/bericht-vereinspokal-bernhard-frey-pokal?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</Link>
		),
		bernhardFreyPokal: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/721128082479661056/bericht-vereinspokal-bernhard-frey-pokal?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</Link>
		),
		jugendmeister: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/718689775244181504/endstand-vereinsmeisterschaften-inkl-jugend?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</Link>
		),
		blitzmeister: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/746504639494651904/aktueller-stand-unserer-liga-mannschaften?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alexander Hande
			</Link>
		),
		jugendBlitzmeister: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/746504639494651904/aktueller-stand-unserer-liga-mannschaften?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Heiko d'Argent
			</Link>
		),
	},
	{
		year: "2022",
		vereinsmeister: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/686337271661789184?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Michail Charalambakis
			</Link>
		),
		pokalsieger: "kein Turnier",
		bernhardFreyPokal: "kein Turnier",
		jugendmeister: "David Bacher",
		blitzmeister: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/704107396018094080/ergebnisse-weihnachts-blitzturniere?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alexander Hande
			</Link>
		),
		jugendBlitzmeister: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/704107396018094080/ergebnisse-weihnachts-blitzturniere?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</Link>
		),
	},
	{
		year: "2021",
		vereinsmeister: "kein Turnier",
		pokalsieger: "kein Turnier",
		bernhardFreyPokal: "kein Turnier",
		jugendmeister: "kein Turnier",
		blitzmeister: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/670948895804817408/ergebnisse-weihnachtsblitzturnier-2021?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alfred Benz
			</Link>
		),
		jugendBlitzmeister: (
			<Link
				href="https://www.tumblr.com/svaltbach-blog/670949651924549632/ergebnisse-weihnachtsblitzturniere-jugend-2021?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</Link>
		),
	},
	{
		year: "2020",
		vereinsmeister: "Alexander Hande",
		pokalsieger: "kein Turnier",
		bernhardFreyPokal: "kein Turnier",
		jugendmeister: "abgebrochen",
		blitzmeister: "kein Turnier",
		jugendBlitzmeister: "kein Turnier",
	},
];

export default function SiegerPage() {
	return (
		<section className="py-20">
				<div className="container mx-auto px-4">
					<h1 className="mb-10 text-center font-bold text-3xl md:text-4xl">
						Vereinsmeister
					</h1>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-center">Jahr</TableHead>
									<TableHead className="text-center">Vereinsmeister</TableHead>
									<TableHead className="text-center">Pokalsieger</TableHead>
									<TableHead className="text-center">
										Bernhard-Frey-Pokal-Sieger
									</TableHead>
									<TableHead className="text-center">Jugendmeister</TableHead>
									<TableHead className="text-center">Blitzmeister</TableHead>
									<TableHead className="text-center">
										Jugend-Blitzmeister
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{winners.map((winner) => (
									<TableRow key={winner.year}>
										<TableCell className="text-center">{winner.year}</TableCell>
										<TableCell className="text-center">
											{winner.vereinsmeister}
										</TableCell>
										<TableCell className="text-center">
											{winner.pokalsieger}
										</TableCell>
										<TableCell className="text-center">
											{winner.bernhardFreyPokal}
										</TableCell>
										<TableCell className="text-center">
											{winner.jugendmeister}
										</TableCell>
										<TableCell className="text-center">
											{winner.blitzmeister}
										</TableCell>
										<TableCell className="text-center">
											{winner.jugendBlitzmeister}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					<p className="mt-6 text-center text-muted-foreground text-sm">
						Historische Einzelergebnisse des Schachverein Altbach e.V.
					</p>
				</div>
			</section>
	);
}
