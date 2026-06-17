import { Link, Table, Text } from "@radix-ui/themes";
import { IconExternalLink } from "@tabler/icons-react";
import type { TournamentDataTypes } from "@/types";

export function ListOfAttendeesLink({ tournament }: Props) {
	return (
		<Table.Row>
			<Table.RowHeaderCell>Teilnehmerliste</Table.RowHeaderCell>
			<Table.Cell>
				{tournament.listOfAttendeesUrl !== null ? (
					<>
						<Link
							href={tournament.listOfAttendeesUrl}
							target="_blank"
							rel="noreferrer noopener"
							download
							underline="always"
						>
							<span className="flex items-center gap-1">
								<span>Teilnehmerliste öffnen</span>
								<span className="sr-only">Öffnet in neuem Tab</span>
								<IconExternalLink aria-hidden="true" size="16" />
							</span>
						</Link>

						<Text as="p">
							Die Teilnehmerliste ist ein Momentzustand und kann sich bis zu
							Turnierbeginn täglich ändern.
						</Text>
					</>
				) : (
					"Teilnehmerliste wird bald veröffentlich."
				)}
			</Table.Cell>
		</Table.Row>
	);
}

interface Props {
	tournament: TournamentDataTypes;
}
