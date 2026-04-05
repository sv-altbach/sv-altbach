"use server";

import {
	createServerValidate,
	type ServerFormState,
	ServerValidateError,
} from "@tanstack/react-form-nextjs";
import { headers } from "next/headers";
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

	const requestHeaders = await headers();
	const forwardedForHeader = requestHeaders.get("x-forwarded-for") ?? "unknown";
	const sourceIp =
		forwardedForHeader.split(",")[0]?.trim() ||
		requestHeaders.get("x-real-ip") ||
		"unknown";

	const { error } = await resend.batch.send([
		{
			from: `"Kontaktformular svaltbach.de" <${EMAIL_ADDRESSES.inquiries}>`,
			to: EMAIL_ADDRESSES.inquiries,
			replyTo: inputs.email,
			subject: `Neue Kontaktanfrage: ${inputs.subject}`,
			html: `<p>Neue Kontaktanfrage: ${inputs.subject}</p> 
                <p>Name: ${inputs.name}</p> 
                <p>Email: ${inputs.email}</p> 
                <p>Nachricht: ${inputs.message}</p>
                <p>IP-Adresse: ${sourceIp}</p>
                <pre>Headers: ${JSON.stringify(await headers(), null, 2)}</pre>`,
		},
		{
			from: `"Kontaktformular svaltbach.de" <${EMAIL_ADDRESSES.inquiries}>`,
			to: inputs.email,
			subject: "Kontaktformular svaltbach.de",
			html: `<p>Vielen Dank für Ihre Kontaktanfrage. Wir werden uns schnellstmöglich um Ihre Anfrage kümmern.</p>`,
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
