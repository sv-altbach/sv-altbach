import type { Metadata } from "next";
import { Navigation } from "./components/navigation";
import { RootFooter } from "./components/root-footer";

export const metadata: Metadata = {
	title: "Schachverein Altbach e.V.",
	description:
		"Die offizielle Webseite des Schachvereins Altbach e.V. – Informationen über Training, Turniere, Mitgliedschaft und den Verein.",
};

export default function RootSiteLayout({ children }: LayoutProps<"/root">) {
	return (
		<div className="flex min-h-screen flex-col">
			<Navigation />
			<div className="flex-1">{children}</div>
			<RootFooter />
		</div>
	);
}
