import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Devtools } from "@/components/devtools";
import { RootFooter } from "@/components/footer";
import { Toaster } from "@/components/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import appCss from "@/styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Schachverein Altbach e.V." },
			{
				name: "description",
				content:
					"Die offizielle Webseite des Schachvereins Altbach e.V. – Informationen über Training, Turniere, Mitgliedschaft und den Verein.",
			},
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.ico" },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<ThemeProvider>
				<div className="flex min-h-screen flex-col">
					<main className="min-h-screen">
						<Outlet />
					</main>
					<RootFooter />
				</div>
				<Toaster position="bottom-center" closeButton richColors />
				{import.meta.env.DEV ? <Devtools /> : null}
			</ThemeProvider>
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="font-sans antialiased">
				{children}
				<Scripts />
			</body>
		</html>
	);
}
