"use client";

import { IconMenu } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
	{ href: "#basicInfo", label: "Verein" },
	{ href: "#aboutUs", label: "Über uns" },
	{ href: "#training", label: "Training" },
	{ href: "#tournaments", label: "Turniere" },
	{ href: "#costs", label: "Mitgliedschaft" },
	{ href: "#blog", label: "Blog" },
	{ href: "#contact", label: "Kontakt" },
];

export function Navigation() {
	const [open, setOpen] = useState(false);

	const handleNavClick = (
		event: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		event.preventDefault();
		setOpen(false);

		// Smooth scroll to anchor
		const element = document.querySelector(href);
		if (!element) return;

		element.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<nav className="w-full">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo/Brand */}
					<Link
						href="/root"
						className="font-bold text-white text-xl transition-colors hover:text-primary"
					>
						SVA
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden items-center gap-6 md:flex">
						{navItems.map((item) => (
							<a
								key={item.href}
								href={item.href}
								onClick={(e) => handleNavClick(e, item.href)}
								className="font-medium text-sm text-white transition-colors hover:text-primary"
							>
								{item.label}
							</a>
						))}
					</div>

					{/* Mobile Menu Button */}
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger className="md:hidden">
							<IconMenu className="h-6 w-6 text-white" />
							<span className="sr-only">Menu öffnen</span>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="w-[300px] bg-gray-900 text-white"
						>
							<SheetHeader>
								<SheetTitle className="text-white">Navigation</SheetTitle>
							</SheetHeader>
							<nav className="mt-8 flex flex-col gap-4">
								{navItems.map((item) => (
									<a
										key={item.href}
										href={item.href}
										onClick={(e) => handleNavClick(e, item.href)}
										className="border-gray-800 border-b py-2 text-white transition-colors hover:text-primary"
									>
										{item.label}
									</a>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
}
