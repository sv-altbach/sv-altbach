import {Button} from "@radix-ui/themes";

interface Props {
	isFinalTournament: boolean;
	isRegisterButtonDisabled?: boolean;
	date: string;
}

export function RegisterButton({
	isFinalTournament,
	isRegisterButtonDisabled,
	date,
}: Props) {
	if (isFinalTournament) {
		return null;
	}

	if (isRegisterButtonDisabled) {
		return (
			<Button
				variant="soft"
				disabled
				className="mt-5 cursor-not-allowed!"
			>
				Jetzt Anmelden
			</Button>
		);
	}

	return (
		<Button
			variant="soft"
			mt="2"
			size="4"
			asChild
		>
			<a
				href={`mailto:coellen.f@gmx.de?subject=Anmeldung Turnier am ${date}`}
				aria-label={`Jetzt Anmelden für das Turnier am ${date}`}
			>
				Jetzt Anmelden
			</a>
		</Button>
	);
}
