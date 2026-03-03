export function BlogSection() {
	return (
		<section id="blog" className="bg-gray-50 py-20">
			<div className="container mx-auto px-4">
				<h2 className="mb-2 text-center font-bold text-3xl uppercase md:text-4xl">
					Blog
				</h2>
				<p className="mb-10 text-center text-muted-foreground italic">
					Die neuesten Artikel vom Verein
				</p>
				{/* RSS feed placeholder - to be implemented later */}
				<div id="rssFeed" className="text-center text-muted-foreground">
					<p>RSS Feed wird hier eingebunden</p>
				</div>
			</div>
		</section>
	);
}
