import { Table as RadixTable } from "@radix-ui/themes";
import { TableBody } from "@/app/sub/masters/scoreboard/components/table-body";
import { TableHead } from "@/app/sub/masters/scoreboard/components/table-head";

export function Table() {
	return (
		<RadixTable.Root variant="surface">
			<caption className="sr-only">
				Aktuelle Spieler-Ranglisten-Tabelle der SVA
				Masters. Nach fünf Turnieren, werden die besten 16 Spieler, sowie
				Spieler, die an jedem Turnier mitgewirkt haben, für das Finale
				nominiert.
			</caption>

			<TableHead />
			<TableBody />
		</RadixTable.Root>
	);
}
