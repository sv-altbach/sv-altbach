import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

import "@radix-ui/themes/styles.css";
import "./globals.css";

const Devtools =
	process.env.NODE_ENV === "development"
		? dynamic(async () => (await import("@/components/devtools")).Devtools)
		: () => null;

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				{children}
				<Devtools />
			</body>
		</html>
	);
}
