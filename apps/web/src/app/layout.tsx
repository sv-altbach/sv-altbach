import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";

import "@radix-ui/themes/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<Theme accentColor="red">{children}</Theme>
			</body>
		</html>
	);
}
