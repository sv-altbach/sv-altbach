export default function ImpressumPage() {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-4xl">
					<h1 className="mb-8 font-bold text-3xl md:text-4xl">Impressum:</h1>

					<address className="mb-4 not-italic">
						Schachverein Altbach e.V.
						<br />
						Drosselweg 30
						<br />
						70734 Fellbach
					</address>

					<p className="mb-1">
						<span className="font-semibold text-primary">Telefon:</span> +49 (0)
						1520 9186437
					</p>
					<p className="mb-6">
						<span className="font-semibold text-primary">E-Mail:</span>{" "}
						am2702@aol.com
					</p>

					<p className="mb-2 font-bold">Vertreten durch:</p>
					<ul className="mb-6 list-inside list-disc space-y-1">
						<li>
							1. Vorsitzender: Alexander Hande, Drosselweg 30, 70734 Fellbach,
							01520-9186437, am2702 (ät) aol.com
						</li>
						<li>
							2. Vorsitzender: Deniz Gazitepe, Sonnenhalde 3, 73776 Altbach,
							0176-63893890, deniz.gazitepe (ät) gmail.com
						</li>
						<li>
							Finanzverwalter: Peter Wolf, Hofstraße 45, 73776 Altbach,
							0177-8806113, peter.wolf (ät) onlinehome.de
						</li>
					</ul>

					<p className="mb-4">
						<span className="font-bold">Registergericht</span>
						<br />
						Registernummer Amtsgericht Stuttgart: VR 211765
						<br />
						Umsatzsteuer-Identifikationsnummer gemäß § 27a: UStG59338/09718
						<br />
						Inhaltlich verantwortlich i.S.v. § 55 Abs. 2 RStV: Hande, Alexander,
						Drosselweg 30, 70734 Fellbach
						<br />
						<br />
						Dieses Impressum gilt auch für folgende Social Media Profile
					</p>

					<ul className="list-inside list-disc space-y-1">
						<li>https://www.instagram.com/svaltbach/</li>
						<li>https://www.tumblr.com/svaltbach-blog</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
