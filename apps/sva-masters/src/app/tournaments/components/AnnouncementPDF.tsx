import { Link, Table } from "@radix-ui/themes";
import classNames from "classnames";

interface Props {
	announcementPath?: string | null;
	isRegisterButtonDisabled?: boolean;
}

function AnnouncementPDF({
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
					className={classNames({
						"cursor-pointer!": !isRegisterButtonDisabled,
						"cursor-not-allowed!": isRegisterButtonDisabled,
					})}
				>
					Ausschreibung herunterladen
				</Link>
			</Table.Cell>
		</Table.Row>
	);
}

export default AnnouncementPDF;
