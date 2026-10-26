import { Box, Button, Heading, Text } from "@radix-ui/themes";
import { IconCalendarPlus } from "@tabler/icons-react";
import Link from "next/link";

export function AddToCalendar() {
	return (
		<>
			<Heading as="h2" size="8" mb="2">
				Kalender abonnieren
			</Heading>

			<Text as="p">
				Verpasse keine Termine mehr und füge den SVA Masters Kalender zu deinem Kalender
				hinzu.
			</Text>

			<Box mt="2">
				<Button variant="soft" size="3" asChild>
					<Link href="https://calendar.google.com/calendar/r?cid=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Fical%2F12892aff46f92599e0be17a28a330cc772534a76419207ffe7e1767ebf748f5f%2540group.calendar.google.com%2Fpublic%2Fbasic.ics">
						<IconCalendarPlus aria-hidden="true" />
						Termine zu Kalender hinzufügen
					</Link>
				</Button>
			</Box>
		</>
	);
}
