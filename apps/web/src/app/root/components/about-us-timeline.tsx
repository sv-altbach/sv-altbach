import Image from "next/image";
import { timelineEvents } from "../data/timeline";

export function AboutUsTimeline() {
	return (
		<div>
			<h2 className="mb-2 text-center font-bold text-3xl uppercase md:text-4xl">
				Über uns
			</h2>
			<p className="mb-10 text-center text-muted-foreground italic">
				Ein Verein mit Tradition
			</p>

			<div className="relative">
				{/* Vertical line - visible only on desktop */}
				<div className="-translate-x-1/2 absolute top-0 bottom-0 left-1/2 hidden w-0.5 bg-[#e1e1e1] md:block" />

				{timelineEvents.map((event, index) => {
					const isEven = index % 2 === 0;
					const isLast = index === timelineEvents.length - 1;
					return (
						<div
							key={event.year}
							className={`relative mx-auto grid max-w-7xl grid-cols-12 gap-x-4 ${isLast ? "bg-white" : ""}`}
						>
							{isEven ? (
								<>
									{/* Even items: Text on left (right-aligned), image on right */}
									<div className="order-2 col-span-6 col-start-4 mb-3 sm:order-1 sm:col-span-3 sm:col-start-1 md:order-2 md:col-span-2 md:col-start-6">
										<Image
											src={event.image}
											alt={`${event.year} - ${event.title}`}
											width={200}
											height={200}
											className="h-auto w-full rounded-full border-[#e1e1e1] border-[5px]"
										/>
									</div>
									<div className="order-1 col-span-12 mb-5 flex flex-col justify-center sm:order-2 sm:col-span-9 md:order-1 md:col-span-5 md:col-start-1 md:text-right">
										<h5 className="mb-1 text-center font-bold text-lg sm:text-left md:text-right">
											{event.year}
										</h5>
										<h6 className="mb-2 text-center text-base sm:text-left md:text-right">
											{event.title}
										</h6>
										<p className="text-center text-muted-foreground text-sm leading-relaxed sm:text-left md:text-right">
											{event.description}
										</p>
									</div>
								</>
							) : (
								<>
									{/* Odd items: Image on left, text on right */}
									<div className="order-2 col-span-6 col-start-4 mb-3 sm:order-1 sm:col-span-3 sm:col-start-1 md:col-span-2 md:col-start-6">
										<Image
											src={event.image}
											alt={`${event.year} - ${event.title}`}
											width={200}
											height={200}
											className="h-auto w-full rounded-full border-[#e1e1e1] border-[5px]"
										/>
									</div>
									<div className="order-1 col-span-12 mb-5 flex flex-col justify-center sm:order-2 sm:col-span-9 md:col-span-5 md:col-start-8">
										<h5 className="mb-1 text-center font-bold text-lg sm:text-left">
											{event.year}
										</h5>
										<h6 className="mb-2 text-center text-base sm:text-left">
											{event.title}
										</h6>
										<p className="text-center text-muted-foreground text-sm leading-relaxed sm:text-left">
											{event.description}
										</p>
									</div>
								</>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
