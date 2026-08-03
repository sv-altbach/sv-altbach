import { createFileRoute } from "@tanstack/react-router";
import { MannschaftenPage } from "@/components/mannschaften-page";

export const Route = createFileRoute("/mannschaften")({
	component: MannschaftenPage,
});
