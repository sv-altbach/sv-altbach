import ContactInternalEmail from "@emails/contact-internal";
import ContactUserConfirmationEmail from "@emails/contact-user";
import { EMAIL_ADDRESSES, resend } from "@/integrations/email";
import type { ContactFormActionState, ContactFormFields } from "./options";

export async function sendContactEmails(
	inputs: ContactFormFields,
): Promise<ContactFormActionState> {
	const { error } = await resend.batch.send([
		{
			from: `${EMAIL_ADDRESSES.inquiries.name} <${EMAIL_ADDRESSES.inquiries.address}>`,
			to: EMAIL_ADDRESSES.internalContact.address,
			replyTo: inputs.email,
			subject: `Kontaktanfrage: ${inputs.subject}`,
			react: ContactInternalEmail(inputs),
		},
		{
			from: `${EMAIL_ADDRESSES.inquiries.name} <${EMAIL_ADDRESSES.inquiries.address}>`,
			to: inputs.email,
			subject: "Ihre Kontaktanfrage bei svaltbach.de",
			react: ContactUserConfirmationEmail({ name: inputs.name }),
		},
	]);

	return error
		? {
				status: "ERROR",
				message:
					"Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
			}
		: {
				status: "SUCCESS",
				message: "Ihre Nachricht wurde erfolgreich gesendet.",
			};
}
