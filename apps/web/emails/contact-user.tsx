import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	pixelBasedPreset,
	Tailwind,
	Text,
} from "@react-email/components";

export type ContactUserConfirmationEmailProps = {
	name: string;
};

/** Auto-reply to the person who submitted the contact form (German copy). */
function ContactUserConfirmationEmail({
	name,
}: ContactUserConfirmationEmailProps) {
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
				<Preview>Vielen Dank für Ihre Kontaktanfrage</Preview>
				<Body className="m-0 bg-slate-100 py-8 font-sans text-slate-800">
					<Container className="mx-auto max-w-xl rounded-lg bg-white px-6 py-8 shadow-sm">
						<Heading className="m-0 font-semibold text-slate-900 text-xl">
							Kontaktformular svaltbach.de
						</Heading>
						<Text className="mt-4 text-base text-slate-700">Hallo {name},</Text>
						<Text className="mt-4 text-base text-slate-700 leading-6">
							vielen Dank für Ihre Kontaktanfrage. Wir werden uns
							schnellstmöglich um Ihre Anfrage bemühen.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}

ContactUserConfirmationEmail.PreviewProps = {
	name: "Max Mustermann",
} satisfies ContactUserConfirmationEmailProps;

export default ContactUserConfirmationEmail;
