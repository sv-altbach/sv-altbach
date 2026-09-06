"use client";

import { Popover, Text } from "@radix-ui/themes";
import { prettyNumbers } from "@/app/scoreboard/utils/prettyNumbers";

export function DisplayResult({ points, tooltip }: Props) {
	return (
		<Popover.Root>
			<Popover.Trigger>
				<button>{prettyNumbers(points ?? 0)}</button>
			</Popover.Trigger>
			<Popover.Content size="2">
				<Text as="p" trim="both" size="2">
					{tooltip}
				</Text>
			</Popover.Content>
		</Popover.Root>
	);
}

interface Props {
	points: number | undefined;
	tooltip: string;
}
