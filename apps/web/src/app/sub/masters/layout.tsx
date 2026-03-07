import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "SVA Masters",
	description:
		"Die offizielle Turnierseite der SVA Masters des Schachverein Altbach.",
};

export default function MastersLayout({
	children,
}: LayoutProps<"/sub/masters">) {
	return <Theme accentColor="red">{children}</Theme>;
}
