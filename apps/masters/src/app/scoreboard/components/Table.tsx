import { Table as RadixTable } from "@radix-ui/themes";

import { TableBody } from "@/app/scoreboard/components/table-body";
import { TableHead } from "@/app/scoreboard/components/table-head";

export function Table() {
	return (
		<RadixTable.Root variant="surface">
			<caption className="sr-only">
				Aktuelle Gesamtwertung der SVA Masters. Nach allen Qualifikationsturnieren
				qualifizieren sich die besten 16 Spieler, die an mindestens drei Turnieren
				teilgenommen haben, für das Finale.
			</caption>

			<TableHead />
			<TableBody />
		</RadixTable.Root>
	);
}
