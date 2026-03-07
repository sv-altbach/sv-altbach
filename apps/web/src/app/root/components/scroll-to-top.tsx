"use client";

import { IconArrowUp } from "@tabler/icons-react";
import { useEffect, useEffectEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/ui";

export function ScrollToTopButton({
	className,
	children,
	...props
}: React.ComponentProps<typeof Button>) {
	const [visible, setVisible] = useState(false);

	const updateVisibility = useEffectEvent(() => {
		const scrolled = window.scrollY;
		const total = document.documentElement.scrollHeight - window.innerHeight;
		setVisible(total > 0 && scrolled >= total / 2);
	});

	useEffect(() => {
		window.addEventListener("scroll", updateVisibility, { passive: true });
		return () => window.removeEventListener("scroll", updateVisibility);
	}, []);

	return (
		<Button
			variant="default"
			size="icon-xl"
			className={cn(
				"rounded-full transition-opacity duration-200",
				visible ? "opacity-100" : "pointer-events-none opacity-0",
				className,
			)}
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			aria-label="Scroll to top"
			{...props}
		>
			{children ?? <IconArrowUp className="size-6" />}
		</Button>
	);
}
