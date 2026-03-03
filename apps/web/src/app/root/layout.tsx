import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Schachverein Altbach e.V.",
	description:
		"Die offizielle Webseite des Schachvereins Altbach e.V. – Informationen über Training, Turniere, Mitgliedschaft und den Verein.",
};

export default function RootSiteLayout({ children }: LayoutProps<"/root">) {
	return children;
}
