"use client";

import { Box, Tabs } from "@radix-ui/themes";
import TournamentContent from "@/app/tournaments/TournamentContent";
import tournamentData from "../tournaments.json";

const Tournaments = () => {
	return (
		<Tabs.Root defaultValue="tournament_final">
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
						value={tournament.value}
						date={tournament.date}
						startTime={tournament.startTime}
						endTime={tournament.endTime}
						mode={tournament.mode}
						evaluation={tournament.evaluation}
						announcementPath={tournament.announcementPath}
						listOfAttendeesUrl={tournament.listOfAttendeesUrl}
						type={
							tournament.type as "blitz" | "rapid" | "960" | "final" | undefined
						}
						withMusic={tournament.withMusic}
					/>
				))}
			</Box>
		</Tabs.Root>
	);
};

export default Tournaments;
