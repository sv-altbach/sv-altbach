"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
		others: "", // Honeypot field
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Form submission will be handled server-side later
		console.log("Form submitted:", formData);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<h2 className="mb-2 text-center font-bold text-3xl uppercase md:text-4xl">
				Kontakt
			</h2>
			<p className="mb-10 text-center text-muted-foreground italic">
				Schreib uns eine Nachricht
			</p>

			<form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="space-y-4">
						<div>
							<Label htmlFor="contact-name">
								Name <span className="text-destructive">*</span>
							</Label>
							<Input
								id="contact-name"
								name="name"
								type="text"
								placeholder="z.B. Max Mustermann"
								required
								value={formData.name}
								onChange={handleChange}
								className="mt-1"
							/>
						</div>

						<div>
							<Label htmlFor="contact-email">
								Email Adresse <span className="text-destructive">*</span>
							</Label>
							<Input
								id="contact-email"
								name="email"
								type="email"
								placeholder="z.B. info@example.de"
								required
								value={formData.email}
								onChange={handleChange}
								className="mt-1"
							/>
							<p className="mt-1 text-muted-foreground text-sm">
								Wir geben deine Email an keine Dritten.
							</p>
						</div>

						<div>
							<Label htmlFor="contact-subject">
								Betreff <span className="text-destructive">*</span>
							</Label>
							<Input
								id="contact-subject"
								name="subject"
								type="text"
								placeholder="z.B. Anmeldung Turnier"
								required
								value={formData.subject}
								onChange={handleChange}
								className="mt-1"
							/>
						</div>

						{/* Honeypot field */}
						<div className="hidden">
							<Label htmlFor="contact-others">
								Sonstiges <span className="text-destructive">*</span>
							</Label>
							<Input
								id="contact-others"
								name="others"
								type="text"
								value={formData.others}
								onChange={handleChange}
								tabIndex={-1}
								autoComplete="off"
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="contact-message">
							Nachricht <span className="text-destructive">*</span>
						</Label>
						<Textarea
							id="contact-message"
							name="message"
							placeholder="Bitte trage hier deine Nachricht ein"
							required
							value={formData.message}
							onChange={handleChange}
							className="mt-1 min-h-[200px]"
						/>
					</div>
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
		</>
	);
}
