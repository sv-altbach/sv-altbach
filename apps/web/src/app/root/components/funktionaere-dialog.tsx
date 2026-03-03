"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { funktionaere } from "../data/funktionaere";

export default function FunktionaereDialog() {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<button
						type="button"
						className="text-sm transition-colors hover:text-primary"
					/>
				}
			>
				Funktionäre
			</DialogTrigger>
			<DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Funktionäre</DialogTitle>
					<DialogDescription>
						Kontaktinformationen der Vereinsfunktionäre
					</DialogDescription>
				</DialogHeader>
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Funktion</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Anschrift</TableHead>
								<TableHead>Kontakt</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{funktionaere.map((person) => (
								<TableRow key={`${person.funktion}-${person.name}`}>
									<TableCell>{person.funktion}</TableCell>
									<TableCell>{person.name}</TableCell>
									<TableCell>
										<div className="whitespace-pre-line">
											{person.anschrift}
										</div>
									</TableCell>
									<TableCell>
										<div className="whitespace-pre-line">{person.kontakt}</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</DialogContent>
		</Dialog>
	);
}
