import { Link, Table } from "@radix-ui/themes";
import { cn } from "@/utils/ui";

interface Props {
	announcementPath?: string | null;
	isRegisterButtonDisabled?: boolean;
}

export function AnnouncementPDF({
	announcementPath,
	isRegisterButtonDisabled,
}: Props) {
	if (!announcementPath) {
		return null;
	}

	return (
		<Table.Row>
			<Table.RowHeaderCell>Ausschreibung</Table.RowHeaderCell>
			<Table.Cell>
				<Link
					href={announcementPath}
					download
					underline="always"
					className={cn([
						!isRegisterButtonDisabled && "cursor-pointer!",
						isRegisterButtonDisabled && "cursor-not-allowed!",
					])}
				>
					Ausschreibung herunterladen
				</Link>
			</Table.Cell>
		</Table.Row>
	);
}
