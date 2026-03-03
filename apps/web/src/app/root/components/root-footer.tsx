import type { Route } from "next";
import Link from "next/link";
import FunktionaereDialog from "./funktionaere-dialog";

const footerLinks = {
	links: [
		{ href: "https://schachmatt.net/schach-lernen/", label: "Schach lernen!" },
		{ href: "http://www.schachdepot.de/", label: "Schachartikel online" },
		{
			href: "http://www.svw.info/bezirke/nf/jugend",
			label: "Bezirksjugend NF",
		},
		{
			href: "https://schachzeitung.svw.info/ausgaben",
			label: "Schachzeitung SVW",
		},
		{ href: "https://www.fide.com", label: "Weltschachverband FIDE" },
		{ href: "http://chess-tigers.de/", label: "Chess Tigers Training" },
		{
			href: "https://amateurchess.com/",
			label: "Amateur-Weltmeisterschaften",
		},
	],
	kategorien: [
		{
			href: "/root/docs/Vereinsmeisterschaft 202526 - Ausschreibung.pdf",
			label: "Vereinsmeisterschaft 2025/26",
			external: true,
		},
		{
			href: "/root/mannschaften",
			label: "Mannschaften",
			external: false,
		},
		{ href: "/root/sieger", label: "Einzel", external: false },
		{
			href: "https://svw-schach.liga.nu/cgi-bin/WebObjects/nuLigaSCHACHDE.woa/wa/home",
			label: "Liga-Ergebnisdienst",
			external: true,
		},
		{
			href: "http://www.svw.info/termine",
			label: "SVW Turnierkalender",
			external: true,
		},
		{
			href: "https://wsj-schach.de/menue/wuerttembergische-turnierserien",
			label: "WAM+JPT+SSGT Termine",
			external: true,
		},
		{
			href: "https://www.schachbund.de/verein/C0301.html",
			label: "DWZ-Liste",
			external: true,
		},
		{
			href: "/root/docs/Mitgliedsantrag 2023-03.pdf",
			label: "Mitgliedsantrag",
			external: true,
		},
	],
	social: [
		{ href: "https://www.instagram.com/svaltbach/", label: "Instagram" },
		{ href: "https://www.tumblr.com/svaltbach-blog", label: "Tumblr" },
	],
	rechtliches: [
		{ href: "/root/impressum", label: "Impressum", external: false },
		{ href: "/root/datenschutz", label: "Datenschutz", external: false },
	],
};

export default function RootFooter() {
	return (
		<>
			<footer className="py-10">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
						{/* Links */}
						<div>
							<h3 className="mb-2 font-bold uppercase">Links</h3>
							<ul className="space-y-2">
								{footerLinks.links.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-muted-foreground text-sm transition-colors hover:text-primary"
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>

						{/* Kategorien */}
						<div>
							<h3 className="mb-2 font-bold uppercase">Kategorien</h3>
							<ul className="space-y-2">
								{footerLinks.kategorien.map((link, idx) => {
									if (idx === 1) {
										return (
											<li key={link.href} className="text-sm">
												Historisch:{" "}
												<Link
													href={link.href as Route}
													className="text-muted-foreground transition-colors hover:text-primary"
												>
													Mannschaften
												</Link>{" "}
												/{" "}
												<Link
													href={
														(footerLinks.kategorien[2]?.href ??
															"/root/sieger") as Route
													}
													className="text-muted-foreground transition-colors hover:text-primary"
												>
													Einzel
												</Link>
											</li>
										);
									}
									if (idx === 2) return null; // Skip "Einzel" as it's handled above
									if (idx === 6) {
										return (
											<li key={link.href} className="text-sm">
												<FunktionaereDialog />
												{" / "}
												<a
													href={link.href}
													target="_blank"
													rel="noopener noreferrer"
													className="text-muted-foreground transition-colors hover:text-primary"
												>
													DWZ-Liste
												</a>
											</li>
										);
									}
									return (
										<li key={link.href}>
											{link.external ? (
												<a
													href={link.href}
													target="_blank"
													rel="noopener noreferrer"
													className="text-muted-foreground text-sm transition-colors hover:text-primary"
												>
													{link.label}
												</a>
											) : (
												<Link
													href={link.href as Route}
													className="text-muted-foreground text-sm transition-colors hover:text-primary"
												>
													{link.label}
												</Link>
											)}
										</li>
									);
								})}
							</ul>
						</div>

						{/* Social Media */}
						<div>
							<h3 className="mb-2 font-bold uppercase">Social Media</h3>
							<ul className="space-y-2">
								{footerLinks.social.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-muted-foreground text-sm transition-colors hover:text-primary"
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>

						{/* Rechtliches */}
						<div>
							<h3 className="mb-2 font-bold uppercase">Rechtliches</h3>
							<ul className="space-y-2">
								{footerLinks.rechtliches.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href as Route}
											className="text-muted-foreground text-sm transition-colors hover:text-primary"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</footer>

			{/* Copyright */}
			<section className="bg-primary py-4 text-white">
				<div className="container mx-auto px-4">
					<p className="mb-0">SVA</p>
					<p className="text-sm">&copy; Copyright 2019 SV Altbach e.V.</p>
				</div>
			</section>
		</>
	);
}
