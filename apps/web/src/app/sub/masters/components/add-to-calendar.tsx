import { Box, Heading, Text } from "@radix-ui/themes";
import { IconCalendarPlus } from "@tabler/icons-react";
import Link from "next/link";

export function AddToCalendar() {
	return (
		<>
			<Heading as="h3">Kalender abonnieren</Heading>

			<Text as="p">
				Verpasse keine Termine mehr und füge den SVA Masters Kalender zu deinem
				Kalender hinzu.
			</Text>

			<Box mt="2">
				<Link
					href="https://calendar.google.com/calendar/r?cid=https%3A%2F%2Fcalendar.google.com%2Fcalendar%2Fical%2F12892aff46f92599e0be17a28a330cc772534a76419207ffe7e1767ebf748f5f%2540group.calendar.google.com%2Fpublic%2Fbasic.ics"
					className="flex max-w-max items-center gap-2 rounded-md bg-[#f3000d14] px-4 py-2 text-[#c40006d3] -outline-offset-1 hover:bg-[#ff000824] focus:outline-2 focus:outline-[#eb8e90]"
				>
					<IconCalendarPlus size="2.5em" aria-hidden="true" />
					<Text as="span">Termine zu Kalender hinzufügen</Text>
				</Link>
			</Box>
		</>
	);
}
