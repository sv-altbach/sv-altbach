import type { Route } from "next";
import { redirect } from "next/navigation";

export default function HomePage() {
	redirect("/admin" as Route);
}
