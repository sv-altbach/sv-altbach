export interface Player {
  id: string;
	name: string;
	tournamentPoints: number;
	buchholz: number;
	// hasPlayedThreeOrMoreTournaments?: boolean;
}

export interface TournamentResultPlayer {
  "rank": number;
  "playerId": string;
  "name": string;
  "rating": number;
  "score": number;
  "buchholz": number;
}

export interface TournamentResult {
  "data": {
    "tournamentName": string;
    "totalRounds": number;
    "pointRule": "1-point" | "3-point";
    "rows": TournamentResultPlayer[];
  }
}

export interface TournamentDataTypes {
	name: string;
	status: "completed" | "upcoming";
	value: string;
	date: string | null;
	startTime: string | null;
	endTime: string | null;
	type: "blitz" | "rapid" | "960" | "final";
	mode: string | null;
	pointRule: "1-point" | "3-point" | null;
	evaluation: string | null;
	entryFee: {
		preRegistration: string;
		normalRegistration: string;
	} | null;
	venue: string | null;
	announcementPath: string | null;
	listOfAttendeesUrl: string | null;
	generalInformation: string | null;
}
