import { createFileRoute } from "@tanstack/react-router";
import { SiegerPage } from "@/components/sieger-page";

export const Route = createFileRoute("/sieger")({
	component: SiegerPage,
});
