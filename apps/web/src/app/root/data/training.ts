export interface TrainingSchedule {
	day: string;
	time: string;
	description: string;
	trainer: string;
}

export interface TrainingType {
	id: string;
	title: string;
	description: string;
	schedules: TrainingSchedule[];
}

export const trainingTypes: TrainingType[] = [
	{
		id: "jugend",
		title: "Jugend",
		description:
			"Am Jugendtraining können Kinder und Jugendliche teilnehmen. Kinder unter 14 Jahren müssen von ihren Eltern abgeholt werden.",
		schedules: [
			{
				day: "Dienstag",
				time: "19:00 - 20:00 Uhr",
				description: "Jugendtraining online",
				trainer: "Simona Gheng",
			},
			{
				day: "Freitag",
				time: "18:15 - 19:15 Uhr",
				description: "Minis unter 12 Jahren",
				trainer: "Larissa Tomas",
			},
			{
				day: "Freitag",
				time: "18:15 - 19:15 Uhr",
				description: "ältere Jugend, Spaß-Partien",
				trainer: "Ediz Gazitepe, Rrustem Gavrani",
			},
			{
				day: "Freitag",
				time: "ab 19:15 Uhr",
				description: "Aktive (inkl. ältere Jugend)",
				trainer: "Alexander Hande",
			},
		],
	},
	{
		id: "erwachsen",
		title: "Aktive",
		description:
			"Das Training der Aktiven (inkl. ältere Jugend) beginnt um 19:15 Uhr, außer es ist um 18:30 Uhr Vereinsmeisterschaft. Auch Gäste sind willkommen!",
		schedules: [
			{
				day: "Freitag",
				time: "ab 19:15 Uhr",
				description: "Aktive (inkl. aktive Jugend)",
				trainer: "Alexander Hande",
			},
		],
	},
	{
		id: "einzel",
		title: "Einzeltraining",
		description:
			"Gutes Training ist wichtig, in der Gruppe kann nicht auf jeden individuell eingegangen werden. Kostenpflichtiges Einzeltraining kann auf Wunsch vermittelt werden, die meisten Trainer nehmen ungefähr 30 Euro pro Stunde.",
		schedules: [
			{
				day: "Individuell",
				time: "Individuell",
				description: "Nach Absprache",
				trainer: "Alexander Hande",
			},
		],
	},
];
