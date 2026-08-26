import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@sv-altbach/ui/components/table";

// Simplified data structure with recent winners
const winners = [
	{
		year: "2025",
		vereinsmeister: (
			<a
				href="https://svaltbach-blog.tumblr.com/post/781201425251368960/endstand-der-vereinsmeisterschaften-202425"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</a>
		),
		pokalsieger: "23.05.2025",
		bernhardFreyPokal: "Michail Charalambakis",
		jugendmeister: (
			<a
				href="https://svaltbach-blog.tumblr.com/post/781201425251368960/endstand-der-vereinsmeisterschaften-202425"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</a>
		),
		blitzmeister: "19.12.2025",
		jugendBlitzmeister: "19.12.2025",
	},
	{
		year: "2024",
		vereinsmeister: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/748222039706550272/ergebnisse-vereinsturnier-und-jugendmeisterschaft?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alexander Hande
			</a>
		),
		pokalsieger: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/757283523953623040/r%C3%BCckblick-auf-die-letzten-monate?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Berra Elmas
			</a>
		),
		bernhardFreyPokal: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/757283523953623040/r%C3%BCckblick-auf-die-letzten-monate?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Berra Elmas
			</a>
		),
		jugendmeister: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/748222039706550272/ergebnisse-vereinsturnier-und-jugendmeisterschaft?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Berra Elmas
			</a>
		),
		blitzmeister: (
			<a
				href="https://svaltbach-blog.tumblr.com/post/773733713631756288/was-in-letzter-zeit-geschah"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alexander Hande
			</a>
		),
		jugendBlitzmeister: (
			<a
				href="https://svaltbach-blog.tumblr.com/post/773733713631756288/was-in-letzter-zeit-geschah"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</a>
		),
	},
	{
		year: "2023",
		vereinsmeister: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/718689775244181504/endstand-vereinsmeisterschaften-inkl-jugend?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alexander Hande
			</a>
		),
		pokalsieger: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/721128082479661056/bericht-vereinspokal-bernhard-frey-pokal?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</a>
		),
		bernhardFreyPokal: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/721128082479661056/bericht-vereinspokal-bernhard-frey-pokal?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</a>
		),
		jugendmeister: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/718689775244181504/endstand-vereinsmeisterschaften-inkl-jugend?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</a>
		),
		blitzmeister: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/746504639494651904/aktueller-stand-unserer-liga-mannschaften?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alexander Hande
			</a>
		),
		jugendBlitzmeister: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/746504639494651904/aktueller-stand-unserer-liga-mannschaften?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Heiko d'Argent
			</a>
		),
	},
	{
		year: "2022",
		vereinsmeister: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/686337271661789184?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Michail Charalambakis
			</a>
		),
		pokalsieger: "kein Turnier",
		bernhardFreyPokal: "kein Turnier",
		jugendmeister: "David Bacher",
		blitzmeister: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/704107396018094080/ergebnisse-weihnachts-blitzturniere?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alexander Hande
			</a>
		),
		jugendBlitzmeister: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/704107396018094080/ergebnisse-weihnachts-blitzturniere?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</a>
		),
	},
	{
		year: "2021",
		vereinsmeister: "kein Turnier",
		pokalsieger: "kein Turnier",
		bernhardFreyPokal: "kein Turnier",
		jugendmeister: "kein Turnier",
		blitzmeister: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/670948895804817408/ergebnisse-weihnachtsblitzturnier-2021?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				Alfred Benz
			</a>
		),
		jugendBlitzmeister: (
			<a
				href="https://www.tumblr.com/svaltbach-blog/670949651924549632/ergebnisse-weihnachtsblitzturniere-jugend-2021?source=share"
				target="_blank"
				rel="noopener noreferrer"
				className="text-primary hover:underline"
			>
				David Bacher
			</a>
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

export function SiegerPage() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<h1 className="mb-10 text-center text-3xl font-bold text-balance md:text-4xl">
					Vereinsmeister
				</h1>
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-center text-balance">Jahr</TableHead>
								<TableHead className="text-center text-balance">
									Vereinsmeister
								</TableHead>
								<TableHead className="text-center text-balance">
									Pokalsieger
								</TableHead>
								<TableHead className="text-center text-balance">
									Bernhard-Frey-Pokal-Sieger
								</TableHead>
								<TableHead className="text-center text-balance">
									Jugendmeister
								</TableHead>
								<TableHead className="text-center text-balance">
									Blitzmeister
								</TableHead>
								<TableHead className="text-center text-balance">
									Jugend-Blitzmeister
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{winners.map((winner) => (
								<TableRow key={winner.year}>
									<TableCell className="text-center text-balance">
										{winner.year}
									</TableCell>
									<TableCell className="text-center text-balance">
										{winner.vereinsmeister}
									</TableCell>
									<TableCell className="text-center text-balance">
										{winner.pokalsieger}
									</TableCell>
									<TableCell className="text-center text-balance">
										{winner.bernhardFreyPokal}
									</TableCell>
									<TableCell className="text-center text-balance">
										{winner.jugendmeister}
									</TableCell>
									<TableCell className="text-center text-balance">
										{winner.blitzmeister}
									</TableCell>
									<TableCell className="text-center text-balance">
										{winner.jugendBlitzmeister}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
				<p className="mt-6 text-center text-sm text-balance text-muted-foreground">
					Historische Einzelergebnisse des Schachverein Altbach e.V.
				</p>
			</div>
		</section>
	);
}
