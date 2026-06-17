import {Button} from "@radix-ui/themes";
import type {TournamentDataTypes} from "@/types";

export function RegisterButton({tournament}: Props) {
  const isHidden = tournament.status === "completed" || tournament.announcementPath === null || tournament.type === "final";

	if (isHidden) {
		return null;
	}

	return (
		<Button
			variant="soft"
			mt="2"
			size="4"
			asChild
		>
			<a
				href={`mailto:masters@svaltbach.de?subject=Anmeldung Turnier am ${tournament.date}`}
				aria-label={`Jetzt Anmelden für das Turnier am ${tournament.date}`}
			>
				Jetzt Anmelden
			</a>
		</Button>
	);
}

interface Props {
  tournament: TournamentDataTypes;
}