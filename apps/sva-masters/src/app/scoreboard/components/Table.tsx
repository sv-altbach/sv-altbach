import { Table as RadixTable } from "@radix-ui/themes";
import TableBody from "@/app/scoreboard/components/TableBody";
import TableHead from "@/app/scoreboard/components/TableHead";

interface TableProps {
	mode: "player" | "team";
}

const Table = ({ mode }: TableProps) => {
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
};

export default Table;
