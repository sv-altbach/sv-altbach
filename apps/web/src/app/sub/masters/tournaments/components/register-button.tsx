import { Button } from "@/components/ui/button";

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
				size="xl"
				disabled
				className="mt-5 cursor-not-allowed!"
			>
				Jetzt Anmelden
			</Button>
		);
	}

	return (
		<Button
			render={
				<a
					href={`mailto:masters@svaltbach.de,lars@uhl-inter.net?subject=Anmeldung Turnier am ${date}`}
					aria-label={`Jetzt Anmelden für das Turnier am ${date}`}
				>
					Jetzt Anmelden
				</a>
			}
			nativeButton={false}
			variant="soft"
			size="xl"
			className="mt-5"
		/>
	);
}
