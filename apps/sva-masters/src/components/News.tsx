import { Badge, Box, Flex, Heading } from "@radix-ui/themes";

interface Props extends React.PropsWithChildren {
	title: string;
}

function News({ title, children }: Props) {
	return (
		<Flex align="start" direction={{ initial: "column", md: "row" }}>
			<Badge
				radius="medium"
				size="2"
				variant="soft"
				color="red"
				mr="2"
				mb={{ initial: "1", md: "0" }}
			>
				Neu
			</Badge>

			<Box>
				<Heading as="h3" size="6">
					{title}
				</Heading>

				{children}
			</Box>
		</Flex>
	);
}

export default News;
