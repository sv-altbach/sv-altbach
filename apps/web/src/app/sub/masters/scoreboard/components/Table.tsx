import { Table as RadixTable } from "@radix-ui/themes";
import { TableBody } from "@/app/sub/masters/scoreboard/components/table-body";
import { TableHead } from "@/app/sub/masters/scoreboard/components/table-head";

interface TableProps {
	mode: "player" | "team";
}

export function Table({ mode }: TableProps) {
	const isPlayerTable = mode === "player";

	return (
		<RadixTable.Root variant="surface">
			<caption className="sr-only">
				Aktuelle {isPlayerTable ? "Spieler" : "Team"}-Ranglisten-Tabelle der SVA
				Masters. Nach fünf Turnieren, werden die besten 16 Spieler, sowie
				Spieler, die an jedem Turnier mitgewirkt haben, für das Finale
				nominiert.
			</caption>

			<TableHead isPlayerTable={isPlayerTable} />
			<TableBody isPlayerTable={isPlayerTable} />
		</RadixTable.Root>
	);
}
