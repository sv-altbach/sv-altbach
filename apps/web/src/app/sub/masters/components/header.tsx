import { Flex, Heading, Text } from "@radix-ui/themes";
import { IconChessKnightFilled } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
	return (
		<>
			<IconChessKnightFilled className="mb-5 text-5xl text-white" />

			<Heading as="h1" className="text-white" size="9">
				SVA <Text className="text-red-600">Masters</Text>
			</Heading>

			<Text as="p" size="5" className="text-white">
				18. April 2026, 73776 Altbach
			</Text>

			<Flex gap="4" mt="5">
				<Button
					render={<Link href="/scoreboard" />}
					nativeButton={false}
					size="xl"
				>
					Zur Rangliste
				</Button>
			</Flex>
		</>
	);
}
