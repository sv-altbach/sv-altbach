"use client";

import {Box, Heading, Tabs} from "@radix-ui/themes";
import {tournamentData} from "@/app/tournaments";
import { TournamentContent } from "./tournament-content";

export function Tournaments() {
	return (
		<>
			<Heading as="h2" size="8" mb="2">
				Turnierplan
			</Heading>

			<Tabs.Root defaultValue="tournament_3">
				<Tabs.List size="2">
          {tournamentData.map((tournament, index) => (
            <Tabs.Trigger key={tournament.value} value={tournament.value} className="cursor-pointer!">
              {tournament.type === "final" ? "Finale" : `Turnier ${index + 1}`}
            </Tabs.Trigger>
          ))}
				</Tabs.List>

				<Box px="4" pt="3" pb="2">
					{tournamentData.map((tournament) => (
						<TournamentContent
							key={tournament.value}
							tournament={tournament}
						/>
					))}
				</Box>
			</Tabs.Root>
		</>
	);
}
