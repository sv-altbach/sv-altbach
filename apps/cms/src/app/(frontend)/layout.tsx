import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="de">
			<body>{children}</body>
		</html>
	);
}
