import ContactInternalEmail from "@emails/contact-internal";
import ContactUserConfirmationEmail from "@emails/contact-user";
import { createServerFn } from "@tanstack/react-start";
import { EMAIL_ADDRESSES, resend } from "@/integrations/email";
import { ContactFormFields } from "./options";

export const submitContactForm = createServerFn({ method: "POST" })
	.validator(ContactFormFields)
	.handler(async ({ data }) => {
		const { error } = await resend.batch.send([
			{
				from: `${EMAIL_ADDRESSES.inquiries.name} <${EMAIL_ADDRESSES.inquiries.address}>`,
				to: EMAIL_ADDRESSES.internalContact.address,
				replyTo: data.email,
				subject: `Kontaktanfrage: ${data.subject}`,
				react: ContactInternalEmail(data),
			},
			{
				from: `${EMAIL_ADDRESSES.inquiries.name} <${EMAIL_ADDRESSES.inquiries.address}>`,
				to: data.email,
				subject: "Ihre Kontaktanfrage bei svaltbach.de",
				react: ContactUserConfirmationEmail({ name: data.name }),
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
	});
