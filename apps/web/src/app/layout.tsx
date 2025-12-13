import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@radix-ui/themes/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SVA Masters",
	description:
		"Die offizielle Turnierseite der SVA Masters des Schachverein Altbach.",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<Theme accentColor="red">{children}</Theme>
			</body>
		</html>
	);
}
