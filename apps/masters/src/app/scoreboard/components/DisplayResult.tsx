"use client";

import { Button, Popover, Text } from "@radix-ui/themes";
import { prettyNumbers } from "@/app/scoreboard/utils/prettyNumbers";

export function DisplayResult({ points, tooltip }: Props) {
	return (
		<Popover.Root>
			<Popover.Trigger>
				<Button
					size="1"
					variant="soft"
					className="cursor-pointer! focus:outline-2! focus:outline-offset-2! focus:outline-red-400!"
				>
					{prettyNumbers(points ?? 0)}
				</Button>
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
