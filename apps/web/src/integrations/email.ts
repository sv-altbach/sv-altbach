import { Resend } from "resend";
import * as v from "valibot";

if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_ADDRESSES = {
	info: `info@${process.env.RESEND_DOMAIN}`,
	inquiries: `inquiries@${process.env.RESEND_DOMAIN}`,
} as const;

// Assert all email addresses are valid
Object.values(EMAIL_ADDRESSES).forEach((email) => {
	v.parse(v.pipe(v.string(), v.email()), email);
});
