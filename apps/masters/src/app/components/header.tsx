import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { IconChessKnightFilled } from "@tabler/icons-react";
import Link from "next/link";

export function Header() {
	return (
		<>
			<IconChessKnightFilled className="mb-5 text-5xl text-white" />

			<Heading as="h1" className="text-white" size="9">
				SVA <Text className="text-primary">Masters</Text>
			</Heading>

			<Text as="p" size="5" className="text-white">
				<span className="uppercase">Abgesagt: </span>{" "}
				<del>31. Oktober 2026, 73207 Plochingen</del>
			</Text>

			<Text as="p" size="5" className="text-white">
				Ein Ersatzturnier ist geplant. Der Termin wird in Kürze bekanntgegeben.
			</Text>

			<Flex gap="4" mt="5">
				<Button asChild size="4">
					<Link href="/scoreboard">Zur Rangliste</Link>
				</Button>
			</Flex>
		</>
	);
}
