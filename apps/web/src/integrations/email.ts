import { Resend } from "resend";
import * as v from "valibot";

if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");

export const resend = new Resend(process.env.RESEND_API_KEY);

const EmailEntry = v.object({
	name: v.pipe(v.string(), v.minLength(1), v.description("Name of the sender")),
	address: v.pipe(v.string(), v.email()),
});

const EmailAddresses = v.object({
	inquiries: v.pipe(
		EmailEntry,
		v.description("Email to send inquiry info from"),
	),
	internalContact: v.pipe(
		EmailEntry,
		v.description("Email to send inquiries to"),
	),
});

export const EMAIL_ADDRESSES = v.parse(EmailAddresses, {
	inquiries: {
		name: "Kontaktformular svaltbach.de",
		address: `info@${process.env.RESEND_DOMAIN}`,
	},
	internalContact: {
		name: "Kontaktformular svaltbach.de",
		address:
			process.env.NODE_ENV === "production"
				? (process.env.INTERNTAL_CONTACT_EMAIL as string)
				: (`info@${process.env.RESEND_DOMAIN}` as string),
	},
});
