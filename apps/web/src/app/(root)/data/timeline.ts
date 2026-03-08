export interface TimelineEvent {
	year: string;
	title: string;
	description: string;
	image: string;
	alternate?: boolean; // For alternating left/right layout
}

export const timelineEvents: TimelineEvent[] = [
	{
		year: "1954",
		title: "Erste Aktivitäten",
		description:
			"Innerhalb des VdK wird am 26.03.1954 in der Gaststätte Frühlingsau eine Schachabteilung ins Leben gerufen. Sechs Herren waren von Anfang an dabei, im Juni waren es bereits 19 Mitglieder. Das erste Mannschaftsspiel der Abteilung war ein Freundschaftsspiel gegen Deizisau. Es wurde 3,5 : 6,5 verloren. In der Saison 54 / 55 wurde zum ersten Mal um Mannschaftspunkte gespielt. Bei vier Mannschaften wurde der zweite Platz belegt.",
		image: "/root/images/about-us/about-us-1.jpg",
		alternate: false,
	},
	{
		year: "1969",
		title: "Vereinsgründung",
		description:
			"Am 09.05.1969 wurde der Schachverein Altbach gegründet. Es waren 15 Erwachsene und 12 jugendliche Mitglieder. Das erste Spiel des Vereins war ebenfalls ein Freundschaftsspiel gegen Deizisau und wurde 2,0 : 6,0 verloren.",
		image: "/root/images/about-us/about-us-2.jpg",
		alternate: true,
	},
	{
		year: "1975",
		title: "Heutiges Spiellokal",
		description:
			"Bisher wurde hauptsächlich in Gaststätten gespielt, aber im Jahr 1975 stellte die Gemeinde dem Schachverein ein geeignetes Spiellokal zu Verfügung. Es ist bis heute das Vereinszimmer in der Altbacher Sporthalle.",
		image: "/root/images/about-us/about-us-3.jpg",
		alternate: false,
	},
	{
		year: "1985",
		title: "Beitritt WLSB",
		description:
			"Nachdem im November 1984 die erste offizielle Satzung des Schachvereins erstellt wurde, erfolgte im Jahr darauf der Beitritt zum Württembergischen Landessportbund (WLSB).",
		image: "/root/images/about-us/about-us-4.jpg",
		alternate: true,
	},
	{
		year: "1994",
		title: "Jubiläum mit Jugendturnier",
		description:
			"Im Zuge des anstehenden 25-jährigen Vereins-Jubiläums wurde zum ersten Mal ein offenes Jugendturnier durchgeführt. Zuerst an zwei Tagen, später jährlich und eintägig.",
		image: "/root/images/about-us/about-us-5.jpg",
		alternate: false,
	},
	{
		year: "2008",
		title: "Satzungsüberarbeitung",
		description:
			"Nach intensiven Diskussionen wurde die Satzung komplett überarbeitet und der Verein im Vereinsregister eingetragen. Klarstellungen, Ergänzungen und Aktualisierungen standen dabei im Vordergrund.",
		image: "/root/images/about-us/about-us-6.jpg",
		alternate: true,
	},
];
