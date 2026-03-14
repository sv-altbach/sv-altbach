"use client";

import {
	initialFormState,
	mergeForm,
	useTransform,
} from "@tanstack/react-form-nextjs";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useAppForm } from "@/hooks/form";
import { contactFormAction } from "./action";
import { ContactFormSchema, contactFormOptions } from "./options";

function RequiredFieldAsterisk() {
	return <span className="text-destructive">*</span>;
}

export function ContactForm() {
	const [actionState, action] = useActionState(contactFormAction, {
		formState: initialFormState,
	});

	const transform = useTransform(
		(baseForm) =>
			actionState ? mergeForm(baseForm, actionState.formState) : baseForm,
		[actionState?.formState],
	);

	const form = useAppForm({
		...contactFormOptions,
		transform,
		validators: {
			onBlur: ContactFormSchema,
			onSubmit: ContactFormSchema,
		},
		onSubmit: async ({ formApi, value }) => {
			alert(JSON.stringify(value, null, 2));
			formApi.reset();
		},
	});

	return (
		<form
			action={action}
			onSubmit={form.handleSubmit}
			className="mx-auto max-w-4xl"
		>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<FieldGroup className="gap-4">
					<form.AppField name="name">
						{(field) => (
							<field.Root>
								<field.Label htmlFor="contact-name">
									Name <RequiredFieldAsterisk />
								</field.Label>
								<field.Input
									id="contact-name"
									type="text"
									placeholder="z.B. Max Mustermann"
									required
								/>
								<field.Error />
							</field.Root>
						)}
					</form.AppField>

					<form.AppField name="email">
						{(field) => (
							<field.Root>
								<field.Label htmlFor="contact-email">
									Email Adresse <RequiredFieldAsterisk />
								</field.Label>
								<field.Input
									id="contact-email"
									type="email"
									placeholder="z.B. info@example.de"
									required
								/>
								<field.Error />
								<field.Description>
									Wir geben deine Email an keine Dritten.
								</field.Description>
							</field.Root>
						)}
					</form.AppField>

					<form.AppField name="subject">
						{(field) => (
							<field.Root>
								<field.Label htmlFor="contact-subject">
									Betreff <RequiredFieldAsterisk />
								</field.Label>
								<field.Input
									id="contact-subject"
									type="text"
									placeholder="z.B. Anmeldung Turnier"
									required
								/>
								<field.Error />
							</field.Root>
						)}
					</form.AppField>
				</FieldGroup>

				<FieldGroup>
					<form.AppField name="message">
						{(field) => (
							<field.Root>
								<field.Label htmlFor="contact-message">
									Nachricht <RequiredFieldAsterisk />
								</field.Label>
								<field.Textarea
									id="contact-message"
									required
									placeholder="Bitte trage hier deine Nachricht ein"
									className="min-h-[200px]"
								/>
								<field.Error />
							</field.Root>
						)}
					</form.AppField>
				</FieldGroup>
			</div>

			<div className="mt-6 text-center">
				<Button type="submit" className="uppercase">
					Senden
				</Button>
			</div>

			<p className="mt-4 text-center text-muted-foreground text-sm">
				Alle Felder, die mit einem Sternchen (*) markiert sind, sind
				Pflichtfelder.
			</p>
		</form>
	);
}
