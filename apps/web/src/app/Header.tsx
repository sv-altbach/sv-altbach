import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { FaChessKnight } from "react-icons/fa6";

const Header = () => {
	return (
		<>
			<FaChessKnight className="mb-5 text-5xl text-white" />

			<Heading as="h1" className="text-white" size="9">
				SVA <Text className="text-red-600">Masters</Text>
			</Heading>

			<Text as="p" size="5" className="text-white">
				29. November 2025, 73207 Plochingen
			</Text>

			<Flex gap="4" mt="5">
				<Button
					asChild
					className="cursor-pointer!"
					variant="solid"
					size="4"
					color="red"
				>
					<Link href="/scoreboard">Zur Rangliste</Link>
				</Button>
			</Flex>
		</>
	);
};

export default Header;
