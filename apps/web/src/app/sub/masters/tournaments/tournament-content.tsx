import {Table, Tabs} from "@radix-ui/themes";
import {AnnouncementPDF} from "@/app/sub/masters/tournaments/components/announcement-pdf";
import {BasicInformation} from "@/app/sub/masters/tournaments/components/basic-information";
import {EntryFees} from "@/app/sub/masters/tournaments/components/entry-fees";
import {ListOfAttendeesLink} from "@/app/sub/masters/tournaments/components/list-of-attendees-link";
import {PointRules} from "@/app/sub/masters/tournaments/components/point-rules";
import {Prizes} from "@/app/sub/masters/tournaments/components/prizes";
import {RegisterButton} from "@/app/sub/masters/tournaments/components/register-button";
import {Venue} from "@/app/sub/masters/tournaments/components/Venue";
import type {TournamentDataTypes} from "@/types";

export function TournamentContent({tournament}: Props) {
  return (
      <Tabs.Content value={tournament.value}>
        <Table.Root>
          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>Datum</Table.RowHeaderCell>
              <Table.Cell>{tournament.date ?? "Datum wird bald bekanntgegeben."}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Beginn</Table.RowHeaderCell>
              <Table.Cell>{tournament.startTime ?? "Uhrzeit wird bald bekanntgegeben."}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Ende</Table.RowHeaderCell>
              <Table.Cell>{tournament.endTime ?? "Uhrzeit wird bald bekanntgegeben."}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Disziplin</Table.RowHeaderCell>
              <Table.Cell>{getTypeValue(tournament.type)}</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Modus</Table.RowHeaderCell>
              <Table.Cell>{tournament.mode ?? "Turniermodus wird bald bekanntgegeben."}</Table.Cell>
            </Table.Row>

            <PointRules tournament={tournament} />

            <Table.Row>
              <Table.RowHeaderCell>Auswertung</Table.RowHeaderCell>
              <Table.Cell>{tournament.evaluation ?? "Auswertung wird bald bekanntgegeben"}</Table.Cell>
            </Table.Row>

            <EntryFees tournament={tournament} />

            <Venue tournament={tournament} />

            <Prizes/>

            <AnnouncementPDF tournament={tournament} />

            <ListOfAttendeesLink tournament={tournament}/>

            <BasicInformation tournament={tournament}/>
          </Table.Body>
        </Table.Root>

        <RegisterButton tournament={tournament} />
      </Tabs.Content>
  );
}

function getTypeValue(type: "blitz" | "rapid" | "960" | "final"): string {
  const map: Record<"blitz" | "rapid" | "960" | "final", string> = {
    "blitz": "Blitz",
    "rapid": "Rapid",
    "960": "Rapid Chess960",
    "final": "Modus wird bald bekanntgegeben.",
  }

  return map[type];
}

interface Props {
  tournament: TournamentDataTypes;
}
