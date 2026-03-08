import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getLatestBlogPosts, TUMBLR_BLOG_URL } from "./blog.data";

const publishedAtFormatter = new Intl.DateTimeFormat("de-DE", {
	day: "2-digit",
	month: "long",
	year: "numeric",
});

export async function BlogSection() {
	const posts = await getLatestBlogPosts();

	return (
		<div>
			<h2 className="mb-2 text-center font-bold text-3xl uppercase md:text-4xl">
				Blog
			</h2>
			<p className="mb-10 text-center text-muted-foreground italic">
				Die neuesten Artikel vom Verein
			</p>

			{posts.length > 0 ? (
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					{posts.map((post) => (
						<Card key={post.id} className="h-full">
							<CardHeader>
								<p className="text-muted-foreground text-sm">
									<time dateTime={post.publishedAt}>
										{publishedAtFormatter.format(new Date(post.publishedAt))}
									</time>
								</p>
								<CardTitle>{post.title}</CardTitle>
							</CardHeader>
							<CardContent className="flex-1">
								<p className="text-muted-foreground">{post.excerpt}</p>
							</CardContent>
							<CardFooter>
								<a
									href={post.url}
									target="_blank"
									rel="noopener noreferrer"
									className="font-medium text-primary text-sm hover:underline"
								>
									Zum Beitrag
								</a>
							</CardFooter>
						</Card>
					))}
				</div>
			) : (
				<div className="rounded-xl border border-dashed p-6 text-center text-muted-foreground">
					<p className="mb-2">Der Blog ist aktuell nicht erreichbar.</p>
					<a
						href={TUMBLR_BLOG_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-primary hover:underline"
					>
						Beiträge direkt auf Tumblr ansehen
					</a>
				</div>
			)}
		</div>
	);
}
