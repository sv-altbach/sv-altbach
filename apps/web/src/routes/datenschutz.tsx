import { createFileRoute } from "@tanstack/react-router";
import { DatenschutzPage } from "@/components/datenschutz-page";

export const Route = createFileRoute("/datenschutz")({
	component: DatenschutzPage,
});
