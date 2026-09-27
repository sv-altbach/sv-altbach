"use client";

import { Button, Popover, Text } from "@radix-ui/themes";

import { prettyNumbers } from "@/app/scoreboard/utils/prettyNumbers";

export function DisplayResult({ points, tooltip, isActive }: Props) {
	return (
		<Popover.Root>
			<Popover.Trigger>
				<Button
					size="1"
					variant="soft"
					color={!isActive ? "red" : points === undefined ? "gray" : "green"}
					className={`cursor-pointer! focus:outline-offset-2! ${!isActive ? "text-red-800! line-through!" : points === undefined ? "text-gray-800!" : "text-green-800!"}`}
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
	isActive: boolean;
}
