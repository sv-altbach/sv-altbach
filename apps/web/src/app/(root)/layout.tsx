import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { RootFooter } from "./components/footer";

export const metadata: Metadata = {
	title: "Schachverein Altbach e.V.",
	description:
		"Die offizielle Webseite des Schachvereins Altbach e.V. – Informationen über Training, Turniere, Mitgliedschaft und den Verein.",
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
	return (
		<ThemeProvider>
			<div className="flex min-h-screen flex-col">
				<main className="min-h-screen">{children}</main>
				<RootFooter />
			</div>
		</ThemeProvider>
	);
}
