import { formOptions } from "@tanstack/react-form-nextjs";
import * as v from "valibot";

export const ContactFormSchema = v.object({
	name: v.pipe(v.string(), v.minLength(1, "Name ist erforderlich")),
	email: v.pipe(v.string(), v.email("Ungültige Email Adresse")),
	subject: v.pipe(v.string(), v.minLength(1, "Betreff ist erforderlich")),
	message: v.pipe(v.string(), v.minLength(1, "Nachricht ist erforderlich")),
});

export type ContactFormValues = v.InferOutput<typeof ContactFormSchema>;

export const contactFormOptions = formOptions({
	defaultValues: {
		name: "",
		email: "",
		subject: "",
		message: "",
	} satisfies ContactFormValues,
});
