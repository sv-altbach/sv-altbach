/** biome-ignore-all lint/style/noHeadElement: Not a NextJS app */

import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { RootFooter } from "@/components/footer";
import { Toaster } from "@/components/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import styles from "@/styles.css?url";

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
			{ rel: "stylesheet", href: styles },
			{ rel: "icon", href: "/favicon.ico" },
		],
	}),
	shellComponent: RootDocument,
	component: RootComponent,
});

function RootComponent() {
	return (
		<ThemeProvider>
			<div className="flex min-h-screen flex-col">
				<main className="min-h-screen">
					<Outlet />
				</main>
				<RootFooter />
			</div>

			<Toaster position="bottom-center" closeButton richColors />

			<TanStackDevtools plugins={[formDevtoolsPlugin()]} />
		</ThemeProvider>
	);
}

function RootDocument({ children }: React.PropsWithChildren) {
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
