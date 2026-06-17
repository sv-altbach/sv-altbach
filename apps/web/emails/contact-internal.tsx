import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	pixelBasedPreset,
	Section,
	Tailwind,
	Text,
} from "react-email";

export type ContactInternalEmailProps = {
	name: string;
	email: string;
	subject: string;
	message: string;
};

/** Staff notification for a new contact form submission (German copy). */
function ContactInternalEmail({
	name,
	email,
	subject,
	message,
}: ContactInternalEmailProps) {
	return (
		<Html lang="de">
			<Tailwind
				config={{
					presets: [pixelBasedPreset],
					theme: {
						extend: {
							colors: {
								brand: "#0f172a",
							},
						},
					},
				}}
			>
				<Head />
				<Preview>Neue Kontaktanfrage: {subject}</Preview>
				<Body className="m-0 bg-slate-100 py-8 font-sans text-slate-800">
					<Container className="mx-auto max-w-xl rounded-lg bg-white px-6 py-8 shadow-sm">
						<Heading className="m-0 font-semibold text-slate-900 text-xl">
							Neue Kontaktanfrage
						</Heading>
						<Text className="mt-4 text-base text-slate-700">
							Betreff: <strong>{subject}</strong>
						</Text>
						<Hr className="my-6 border-slate-200" />
						<Section>
							<Text className="m-0 font-medium text-slate-500 text-sm">
								Name
							</Text>
							<Text className="mt-1 text-base text-slate-800">{name}</Text>
							<Text className="m-0 mt-4 font-medium text-slate-500 text-sm">
								E-Mail
							</Text>
							<Text className="mt-1 text-base text-slate-800">{email}</Text>
							<Text className="m-0 mt-4 font-medium text-slate-500 text-sm">
								Nachricht
							</Text>
							<Text className="mt-1 whitespace-pre-wrap text-base text-slate-800">
								{message}
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

ContactInternalEmail.PreviewProps = {
	name: "Max Mustermann",
	email: "max@example.com",
	subject: "Testbetreff",
	message: "Hallo,\n\ndies ist eine mehrzeilige Nachricht.",
} satisfies ContactInternalEmailProps;

export default ContactInternalEmail;
