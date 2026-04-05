import { ContactForm } from "./contact-form";

export function ContactSection() {
	return (
		<div>
			<h2 className="mb-2 text-balance text-center font-bold text-3xl uppercase md:text-4xl">
				Kontakt
			</h2>
			<p className="mb-10 text-balance text-center text-muted-foreground italic">
				Schreib uns eine Nachricht
			</p>
			<ContactForm />
		</div>
	);
}
