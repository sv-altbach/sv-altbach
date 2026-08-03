import { createServerFn } from "@tanstack/react-start";
import { ContactFormFields } from "./options";

export const submitContactForm = createServerFn({ method: "POST" })
	.validator(ContactFormFields)
	.handler(async ({ data }) => {
		const { sendContactEmails } = await import("./contact.server");
		return sendContactEmails(data);
	});
