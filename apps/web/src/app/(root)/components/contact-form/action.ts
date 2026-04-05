"use server";

import ContactInternalEmail from "@emails/contact-internal";
import ContactUserConfirmationEmail from "@emails/contact-user";
import {
	createServerValidate,
	type ServerFormState,
	ServerValidateError,
} from "@tanstack/react-form-nextjs";
import { EMAIL_ADDRESSES, resend } from "@/integrations/email";
import { ContactFormFields, contactFormOptions } from "./options";

export type ContactFormActionState =
	| { status: "idle" }
	| {
			status: "validation_error";
			formState: ServerFormState<ContactFormFields, typeof ContactFormFields>;
	  }
	| { status: "success" }
	| { status: "error"; message: string };

const serverValidate = createServerValidate({
	...contactFormOptions,
	onServerValidate: ContactFormFields,
});

export async function contactFormAction(
	_prev: ContactFormActionState,
	formData: FormData,
): Promise<ContactFormActionState> {
	let inputs: ContactFormFields;
	try {
		inputs = await serverValidate(formData);
	} catch (error) {
		if (!(error instanceof ServerValidateError)) throw error;
		return { status: "validation_error", formState: error.formState };
	}

	const { error } = await resend.batch.send([
		{
			from: `"Kontaktformular svaltbach.de" <${EMAIL_ADDRESSES.inquiries}>`,
			to: EMAIL_ADDRESSES.inquiries,
			replyTo: inputs.email,
			subject: `Neue Kontaktanfrage: ${inputs.subject}`,
			react: ContactInternalEmail(inputs),
		},
		{
			from: `"Kontaktformular svaltbach.de" <${EMAIL_ADDRESSES.inquiries}>`,
			to: inputs.email,
			subject: "Kontaktformular svaltbach.de",
			react: ContactUserConfirmationEmail({ name: inputs.name }),
		},
	]);

	if (error) {
		console.error("Resend batch send failed:", error);
		return {
			status: "error",
			message:
				"Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
		};
	}

	return { status: "success" };
}
