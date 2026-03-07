import type { Metadata } from "next";
import { RootFooter } from "./components/footer";

export const metadata: Metadata = {
	title: "Schachverein Altbach e.V.",
	description:
		"Die offizielle Webseite des Schachvereins Altbach e.V. – Informationen über Training, Turniere, Mitgliedschaft und den Verein.",
};

export default function SiteLayout({ children }: LayoutProps<"/root">) {
	return (
		<div className="flex min-h-screen flex-col">
			<main className="min-h-screen">{children}</main>
			<RootFooter />
		</div>
	);
}
