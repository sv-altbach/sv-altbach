import { Table, Tabs } from "@radix-ui/themes";
import { AnnouncementPDF } from "@/app/sub/masters/tournaments/components/announcement-pdf";
import { AwardOfPoints } from "@/app/sub/masters/tournaments/components/award-of-points";
import { BasicInformation } from "@/app/sub/masters/tournaments/components/basic-information";
import { EntryFees } from "@/app/sub/masters/tournaments/components/entry-fees";
import { ListOfAttendeesLink } from "@/app/sub/masters/tournaments/components/list-of-attendees-link";
import { PointRules } from "@/app/sub/masters/tournaments/components/point-rules";
import { Prizes } from "@/app/sub/masters/tournaments/components/prizes";
import { RegisterButton } from "@/app/sub/masters/tournaments/components/register-button";
import { Venue } from "@/app/sub/masters/tournaments/components/Venue";

interface Props {
	type?: "blitz" | "rapid" | "960" | "final";
	date: string;
	startTime: string;
	endTime: string;
	mode: string;
	value: string;
	evaluation: string;
	announcementPath?: string | null;
	listOfAttendeesUrl?: string | null;
	withMusic?: boolean;
}

export function TournamentContent({
	value,
	type,
	mode,
	endTime,
	startTime,
	date,
	evaluation,
	announcementPath,
	listOfAttendeesUrl,
	withMusic,
}: Props) {
	const isFinalTournament = value === "tournament_final";
	const isRegisterButtonDisabled = false;
	const isRegisterButtonHidden =
		value === "tournament_1" ||
		value === "tournament_2" ||
		value === "tournament_3" ||
		value === "tournament_4" ||
		value === "tournament_5";

	return (
		<Tabs.Content value={value}>
			<Table.Root>
				<Table.Body>
					<Table.Row>
						<Table.RowHeaderCell>Datum</Table.RowHeaderCell>
						<Table.Cell>{date}</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.RowHeaderCell>Beginn</Table.RowHeaderCell>
						<Table.Cell>{startTime}</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.RowHeaderCell>Ende</Table.RowHeaderCell>
						<Table.Cell>{endTime}</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.RowHeaderCell>Disziplin</Table.RowHeaderCell>
						<Table.Cell>
							{type === "blitz" ? "Blitz" : null}
							{type === "rapid" ? "Rapid" : null}
							{type === "960" ? "Rapid Chess960" : null}
							{type === "final" ? "Blizt, Rapid, Rapid Chess960" : null}
						</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.RowHeaderCell>Modus</Table.RowHeaderCell>
						<Table.Cell>{mode}</Table.Cell>
					</Table.Row>

					<PointRules isFinalTournament={isFinalTournament} />

					<Table.Row>
						<Table.RowHeaderCell>Auswertung</Table.RowHeaderCell>
						<Table.Cell>{evaluation}</Table.Cell>
					</Table.Row>

					<EntryFees isFinalTournament={isFinalTournament} value={value} />

					<Venue value={value} />

					<Prizes isFinalTournament={isFinalTournament} value={value} />

					<AwardOfPoints isFinalTournament={isFinalTournament} />

					<AnnouncementPDF
						announcementPath={announcementPath}
						isRegisterButtonDisabled={isRegisterButtonDisabled}
					/>

					<ListOfAttendeesLink url={listOfAttendeesUrl} />

					<BasicInformation withMusic={withMusic} value={value} />
				</Table.Body>
			</Table.Root>

			{isRegisterButtonHidden ? null : (
				<RegisterButton
					isFinalTournament={isFinalTournament}
					date={date}
					isRegisterButtonDisabled={isRegisterButtonDisabled}
				/>
			)}
		</Tabs.Content>
	);
}
