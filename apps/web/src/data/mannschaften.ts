export interface TeamResult {
	saison: string;
	landesliga?: string;
	bezirksliga?: string;
	kreisklasse1?: string;
	kreisklasse2?: string;
	aKlasse1?: string;
	aKlasse2?: string;
	bKlasse1?: string;
	bKlasse2?: string;
	cKlasse1?: string;
	cKlasse2?: string;
	cKlasse3?: string;
	dKlasse?: string;
}

// Simplified data structure - you can expand this with all historical data
export const teamResults: TeamResult[] = [
	{
		saison: "25/26",
		kreisklasse1: "1. Mannschaft",
		bKlasse1: "2. Mannschaft",
	},
	{
		saison: "24/25",
		kreisklasse1: "6. Platz",
		bKlasse1: "4. Platz",
	},
	{
		saison: "23/24",
		kreisklasse1: "6. Platz",
		bKlasse1: "3. Platz",
		cKlasse1: "4. Platz",
	},
	{
		saison: "22/23",
		kreisklasse1: "9. Platz",
		bKlasse1: "3. Platz",
	},
	{
		saison: "21/22",
		kreisklasse1: "5. Platz",
		aKlasse1: "10. Platz",
	},
	{
		saison: "20/21",
		kreisklasse1: "Corona-Pause",
		aKlasse1: "Corona-Pause",
	},
	{
		saison: "19/20",
		kreisklasse1: "6. Platz",
		aKlasse1: "9. Platz",
	},
	{
		saison: "18/19",
		kreisklasse1: "6. Platz",
		bKlasse1: "3. Platz",
	},
	{
		saison: "17/18",
		kreisklasse1: "3. Platz",
		bKlasse1: "7. Platz",
	},
	// Add more historical data as needed
];
