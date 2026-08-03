import { createFileRoute } from "@tanstack/react-router";
import { ImpressumPage } from "@/components/impressum-page";

export const Route = createFileRoute("/impressum")({
	component: ImpressumPage,
});
