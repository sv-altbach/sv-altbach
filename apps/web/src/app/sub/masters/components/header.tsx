import {Flex, Heading, Text, Button} from "@radix-ui/themes";
import {IconChessKnightFilled} from "@tabler/icons-react";
import Link from "next/link";

export function Header() {
    return (
        <>
            <IconChessKnightFilled className="mb-5 text-5xl text-white"/>

            <Heading as="h1" className="text-white" size="9">
                SVA <Text className="text-red-600">Masters</Text>
            </Heading>

            <Text as="p" size="5" className="text-white">
                29. Mai 2026, 73035 Göppingen
            </Text>

            <Flex gap="4" mt="5">
                <Button
                    asChild
                    size="4"
                >
                    <Link href="/scoreboard">
                        Zur Rangliste
                    </Link>
                </Button>
            </Flex>
        </>
    );
}
