"use server";

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

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

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

	const safeName = escapeHtml(inputs.name);
	const safeEmail = escapeHtml(inputs.email);
	const safeSubject = escapeHtml(inputs.subject);
	const safeMessage = escapeHtml(inputs.message).replace(/\r\n|\r|\n/g, "<br>");

	const { error } = await resend.batch.send([
		{
			from: `"Kontaktformular svaltbach.de" <${EMAIL_ADDRESSES.inquiries}>`,
			to: EMAIL_ADDRESSES.inquiries,
			replyTo: inputs.email,
			subject: `Neue Kontaktanfrage: ${inputs.subject}`,
			html: `<p>Neue Kontaktanfrage: ${safeSubject}</p>
				<p>Name: ${safeName}</p>
				<p>E-Mail: ${safeEmail}</p>
				<p>Nachricht:</p>
				<p>${safeMessage}</p>`,
		},
		{
			from: `"Kontaktformular svaltbach.de" <${EMAIL_ADDRESSES.inquiries}>`,
			to: inputs.email,
			subject: "Kontaktformular svaltbach.de",
			html: `<p>Vielen Dank für Ihre Kontaktanfrage. Wir werden uns schnellstmöglich um Ihre Anfrage bemühen.</p>`,
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
