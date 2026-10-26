import { Button } from "@sv-altbach/ui/components/button";
import { IconArrowUp } from "@tabler/icons-react";
import { useEffect, useEffectEvent, useState } from "react";

export function ScrollToTopButton({ children, ...props }: React.ComponentProps<typeof Button>) {
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

	if (!visible) return null;

	return (
		<Button
			variant="default"
			size="icon-xl"
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			aria-label="Scroll to top"
			{...props}
		>
			{children ?? <IconArrowUp className="size-6" />}
		</Button>
	);
}
