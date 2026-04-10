import { IconChessQueenFilled, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

const CAMPAIGN_END = new Date("2026-07-01T23:59:59");
const CAMPAIGN_URL =
	"https://www.wirwunder.de/project/174401?utm_campaign=user_share&utm_content=ww-kreissparkasse-esslingen-nuertingen&utm_medium=pm_ww&utm_source=Link&wirwunder=230";

const displayBanner = new Date() < CAMPAIGN_END;

export async function CrowdfundingBanner() {
	"use cache";

	if (!displayBanner) return null;

	return (
		<Link
			href={CAMPAIGN_URL}
			target="_blank"
			rel="noopener noreferrer"
			className="group/banner fade-in slide-in-from-bottom-4 mt-10 block w-full max-w-xl animate-in duration-700"
		>
			<div className="relative overflow-hidden rounded-xl border border-white/8 bg-white/6 px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 group-hover/banner:border-white/15 group-hover/banner:bg-white/9 group-hover/banner:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
				<div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-transparent" />

				<div className="relative flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-5">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/25">
						<IconChessQueenFilled className="size-5 text-primary" />
					</div>

					<div className="flex-1 text-center sm:text-left">
						<p className="font-semibold text-[0.95rem] text-white leading-snug">
							Die Schulschach Mädchen fahren zur Deutschen
							Grundschul-Meisterschaft!
						</p>
						<p className="mt-1 text-[0.82rem] text-white/60 leading-relaxed">
							Helfen sie uns, ihnen die Reise zu finanzieren &mdash; jede Spende
							zählt.
						</p>
					</div>

					<span className="inline-flex h-7 shrink-0 items-center gap-1 rounded-[min(var(--radius-md),12px)] bg-white/10 px-2.5 font-medium text-[0.8rem] text-white ring-1 ring-white/15 backdrop-blur-sm transition-colors group-hover/banner:bg-white/20">
						Zur Kampagne
						<IconExternalLink className="size-3.5" />
					</span>
				</div>
			</div>
		</Link>
	);
}
