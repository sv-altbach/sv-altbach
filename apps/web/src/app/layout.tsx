import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "@radix-ui/themes/styles.css";
import "./globals.css";

const Devtools =
	process.env.NODE_ENV === "development"
		? dynamic(async () => (await import("@/components/devtools")).Devtools)
		: () => null;

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider attribute="class" enableSystem>
					{children}
					<Toaster position="bottom-center" closeButton richColors />
					<Devtools />
				</ThemeProvider>
			</body>
		</html>
	);
}
