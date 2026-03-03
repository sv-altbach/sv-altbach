"use client";

import { IconArrowUp } from "@tabler/icons-react";
import { Activity, useEffect, useEffectEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/ui";

export function ScrollToTopButton({
	className,
	children,
}: React.ComponentProps<typeof Button>) {
	const [visibility, setVisibility] = useState<"visible" | "hidden">("hidden");

	const handleScroll = useEffectEvent(() => {
		const scrolled = window.scrollY;
		const total = document.documentElement.scrollHeight - window.innerHeight;
		setVisibility(total > 0 && scrolled >= total / 2 ? "visible" : "hidden");
	});

	useEffect(() => {
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<Activity mode={visibility}>
			<Button
				variant="default"
				size="icon-xl"
				className={cn("rounded-full", className)}
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				aria-label="Scroll to top"
			>
				{children ?? <IconArrowUp />}
			</Button>
		</Activity>
	);
}
