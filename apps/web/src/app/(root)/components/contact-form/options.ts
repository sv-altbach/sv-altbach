import { formOptions } from "@tanstack/react-form-nextjs";
import * as v from "valibot";

export const ContactFormFields = v.object({
	name: v.pipe(v.string(), v.minLength(1, "Name ist erforderlich")),
	email: v.pipe(v.string(), v.email("Ungültige Email Adresse")),
	subject: v.pipe(v.string(), v.minLength(1, "Betreff ist erforderlich")),
	message: v.pipe(v.string(), v.minLength(1, "Nachricht ist erforderlich")),
});

export type ContactFormFields = v.InferOutput<typeof ContactFormFields>;

export const contactFormOptions = formOptions({
	defaultValues: {
		name: "",
		email: "",
		subject: "",
		message: "",
	} satisfies ContactFormFields,
});

export type ContactFormActionState =
	| { status: "IDLE"; message: null }
	| { status: "SUCCESS"; message: string }
	| { status: "ERROR"; message: string };

export const initialActionState: ContactFormActionState = {
	status: "IDLE",
	message: null,
};
