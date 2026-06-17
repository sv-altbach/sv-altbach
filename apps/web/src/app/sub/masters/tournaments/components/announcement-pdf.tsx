import { Link, Table } from "@radix-ui/themes";
import type { TournamentDataTypes } from "@/types";

export function AnnouncementPDF({ tournament }: Props) {
	return (
		<Table.Row>
			<Table.RowHeaderCell>Ausschreibung</Table.RowHeaderCell>
			<Table.Cell>
				{tournament.announcementPath !== null ? (
					<Link href={tournament.announcementPath} download underline="always">
						Ausschreibung herunterladen
					</Link>
				) : (
					"Ausschreibung wird bald veröffentlicht."
				)}
			</Table.Cell>
		</Table.Row>
	);
}

interface Props {
	tournament: TournamentDataTypes;
}
