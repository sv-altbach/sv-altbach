import { Link, Table, Text } from "@radix-ui/themes";

import { LuExternalLink } from "react-icons/lu";

interface Props {
	url?: string | null;
}

export function ListOfAttendeesLink({ url }: Props) {
	if (!url) {
		return null;
	}

	return (
		<Table.Row>
			<Table.RowHeaderCell>Teilnehmerliste</Table.RowHeaderCell>
			<Table.Cell>
				<Link
					href={url}
					target="_blank"
					rel="noreferrer noopener"
					download
					underline="always"
				>
					<span className="flex items-center gap-1">
						<span>Teilnehmerliste öffnen</span>
						<span className="sr-only">Öffnet in neuem Tab</span>
						<LuExternalLink aria-hidden="true" />
					</span>
				</Link>

				<Text as="p">
					Die Teilnehmerliste ist ein Momentzustand und kann sich bis zu
					Turnierbeginn täglich ändern.
				</Text>
			</Table.Cell>
		</Table.Row>
	);
}
