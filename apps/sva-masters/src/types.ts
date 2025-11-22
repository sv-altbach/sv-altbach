interface TournamentData {
	position: number;
	eloPerformance: number;
}

export interface Player {
	name: string;
	team: AlphabetLetter | "no-team";
	club?: string;
	tournamentData: {
		tournament1: TournamentData | null;
		tournament2: TournamentData | null;
		tournament3: TournamentData | null;
		tournament4: TournamentData | null;
		tournament5: TournamentData | null;
	};
	tournamentPoints?: number;
	teamPoints: number;
	averagePosition?: number;
	bestPosition?: number;
	eloPerformance?: number;
	hasPlayedAllTournaments?: boolean;
}

export interface Team {
	id: AlphabetLetter;
	players: string[];
	registrationEntry?: 3;
	tournamentPoints?: number;
	eloPerformance?: number;
}

export interface TournamentResult {
	tournament: number;
	name: string;
	position: number;
	eloPerformance: number;
}

type AlphabetLetter =
	| "A"
	| "B"
	| "C"
	| "D"
	| "E"
	| "F"
	| "G"
	| "H"
	| "I"
	| "J"
	| "K"
	| "L"
	| "M"
	| "N"
	| "O"
	| "P"
	| "Q"
	| "R"
	| "S"
	| "T"
	| "U"
	| "V"
	| "W"
	| "X"
	| "Y"
	| "Z";
