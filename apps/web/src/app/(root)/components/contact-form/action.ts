"use server";

import {
	createServerValidate,
	ServerValidateError,
} from "@tanstack/react-form-nextjs";
import { headers } from "next/headers";
import { EMAIL_ADDRESSES, resend } from "@/integrations/email";
import {
	ContactFormSchema,
	type ContactFormValues,
	contactFormOptions,
} from "./options";

const serverValidate = createServerValidate({
	...contactFormOptions,
	onServerValidate: ContactFormSchema,
});

export async function contactFormAction(_prev: unknown, formData: FormData) {
	let inputs: ContactFormValues;
	try {
		inputs = await serverValidate(formData);
	} catch (error) {
		if (!(error instanceof ServerValidateError)) throw error;
		return { formState: error.formState };
	}

	const requestHeaders = await headers();
	const forwardedForHeader = requestHeaders.get("x-forwarded-for") ?? "unknown";
	const sourceIp =
		forwardedForHeader.split(",")[0]?.trim() ||
		requestHeaders.get("x-real-ip") ||
		"unknown";

	const result = await resend.batch.send([
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

	console.dir(result, { depth: 5 });
}
