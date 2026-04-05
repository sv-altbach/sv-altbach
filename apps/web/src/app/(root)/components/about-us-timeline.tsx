import Image from "next/image";
import { timelineEvents } from "../data/timeline";

export function AboutUsTimeline() {
	return (
		<div className="relative">
			{/* Vertical line - visible only on desktop */}
			<div className="absolute top-0 bottom-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-[#e1e1e1] md:block" />

				{timelineEvents.map((event) => (
					<div
						key={event.year}
						className="group/item relative mx-auto grid max-w-7xl grid-cols-12 gap-x-4 last:bg-background"
					>
						<div className="order-2 col-span-6 col-start-4 mb-3 sm:order-1 sm:col-span-3 sm:col-start-1 md:col-span-2 md:col-start-6 group-even/item:md:order-2">
							<Image
								src={event.image}
								alt={`${event.year} - ${event.title}`}
								width={200}
								height={200}
								className="h-auto w-full rounded-full border-[#e1e1e1] border-[5px]"
							/>
						</div>
						<div className="order-1 col-span-12 mb-5 flex flex-col justify-center sm:order-2 sm:col-span-9 md:col-span-5 group-even/item:md:order-1 group-even/item:md:col-start-1 group-even/item:md:text-right group-odd/item:md:col-start-8">
							<h5 className="mb-1 text-balance text-center font-bold text-lg sm:text-left group-even/item:md:text-right">
								{event.year}
							</h5>
							<h6 className="mb-2 text-balance text-center text-base sm:text-left group-even/item:md:text-right">
								{event.title}
							</h6>
							<p className="text-balance text-center text-muted-foreground text-sm leading-relaxed sm:text-left group-even/item:md:text-right">
								{event.description}
							</p>
						</div>
					</div>
				))}
		</div>
	);
}
