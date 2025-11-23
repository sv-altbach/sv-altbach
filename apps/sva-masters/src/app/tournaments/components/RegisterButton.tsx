import { Button } from "@radix-ui/themes";
import { cn } from "@/utils";

interface Props {
	isFinalTournament: boolean;
	isRegisterButtonDisabled?: boolean;
	date: string;
}

function RegisterButton({
	isFinalTournament,
	isRegisterButtonDisabled,
	date,
}: Props) {
	if (isFinalTournament) {
		return null;
	}

	return (
		<Button
			variant="soft"
			size="4"
			mt="5"
			disabled={isRegisterButtonDisabled}
			className={cn([
				isRegisterButtonDisabled ? "cursor-not-allowed!" : "cursor-pointer!",
			])}
		>
			{isRegisterButtonDisabled ? (
				<span>Jetzt Anmelden</span>
			) : (
				<a
					href={`mailto:masters@svaltbach.de,lars@uhl-inter.net?subject=Anmeldung Turnier am ${date}`}
				>
					Jetzt Anmelden
				</a>
			)}
		</Button>
	);
}

export default RegisterButton;
