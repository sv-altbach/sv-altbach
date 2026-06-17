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
					<Tabs.Trigger value="tournament_1" className="cursor-pointer!">
						Turnier 1
					</Tabs.Trigger>
					<Tabs.Trigger value="tournament_2" className="cursor-pointer!">
						Turnier 2
					</Tabs.Trigger>
					<Tabs.Trigger value="tournament_3" className="cursor-pointer!">
						Turnier 3
					</Tabs.Trigger>
					<Tabs.Trigger value="tournament_4" className="cursor-pointer!">
						Turnier 4
					</Tabs.Trigger>
          <Tabs.Trigger value="tournament_5" className="cursor-pointer!">
            Turnier 5
          </Tabs.Trigger>
					<Tabs.Trigger value="tournament_final" className="cursor-pointer!">
						Finale
					</Tabs.Trigger>
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
