import { ContactForm } from "./contact-form";

export function ContactSection() {
	return (
		<div>
			<h2 className="mb-2 text-center font-bold text-3xl uppercase md:text-4xl">
				Kontakt
			</h2>
			<p className="mb-10 text-center text-muted-foreground italic">
				Schreib uns eine Nachricht
			</p>
			<ContactForm />
		</div>
	);
}
