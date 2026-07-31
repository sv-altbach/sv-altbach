import {Table, Tooltip} from "@radix-ui/themes";
import type {Player, PlayerMarker} from "@/app/sub/masters/types";
import {cn} from "@/utils/ui";
import {getPlayerName} from "@/utils/utils";
import {IconArrowBadgeUp, IconX} from "@tabler/icons-react";

interface Props {
  playerRowData: {
    player: Player;
    index: number;
    marker: PlayerMarker;
  };
}

export function TableRow({playerRowData}: Props) {
  const {player, index, marker} = playerRowData;

  if (!player) {
    return null;
  }


  return (
      <Table.Row
          className={cn([
            index === 0 && "bg-[#FFD700]",
            index === 1 && "bg-[#C0C0C0]",
            index === 2 && "bg-[#CD7F32]",
          ])}
      >
        <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
        <Table.Cell className="flex items-center">
          {getPlayerName(player.name)}{" "}
          {displayNotQualifiedMarker(marker)}
        </Table.Cell>
        <Table.Cell justify="center">
          {prettyNumbers(player.tournament1)}
        </Table.Cell>
        <Table.Cell justify="center">
          {prettyNumbers(player.tournament2)}
        </Table.Cell>
        <Table.Cell justify="center">
          {prettyNumbers(player.tournament3)}
        </Table.Cell>
        <Table.Cell justify="center">
          {prettyNumbers(player.tournament4)}
        </Table.Cell>
        <Table.Cell justify="center">
          {prettyNumbers(player.tournament5)}
        </Table.Cell>
        <Table.Cell justify="center">{prettyNumbers(player.averageRank)}</Table.Cell>
        <Table.Cell justify="center">{prettyNumbers(player.tournamentPoints)}</Table.Cell>
      </Table.Row>
  )
}

function prettyNumbers(number: number | undefined) {
  if (!number) {
    number = 0;
  }

  return number.toFixed(2).toString()
}

function displayNotQualifiedMarker(marker: PlayerMarker) {
  if (marker === "none") {
    return null;
  }

  return (
      <>
        <Tooltip
            width="180px"
            content={
              marker === "successor" ? "Aktuell als Nachrücker für das Finale qualifiziert." : "Nicht für das Finale qualifiziert. Mindestvoraussetzung sind drei gewertete Turniere."
            }
        >
          {marker === "successor" ? (
              <IconArrowBadgeUp
                  className="text-3xl text-red-600"
                  aria-hidden="true"
              />
          ) : (
              <IconX
                  className="text-3xl text-red-600"
                  aria-hidden="true"
              />
          )}
        </Tooltip>

        <div className="sr-only">
          {marker === "successor" && (
              <p>Aktuell als Nachrücker für das Finale qualifiziert.</p>
          )}

          {marker === "not-qualified" && (
              <p>Nicht für das Finale qualifiziert. Mindestvoraussetzung sind drei gewertete
                Turniere.</p>
          )}
        </div>
      </>
  );
}