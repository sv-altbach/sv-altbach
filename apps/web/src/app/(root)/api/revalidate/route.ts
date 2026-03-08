import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

function hasValidApiKey(providedApiKey: string | null, expectedApiKey: string) {
	if (providedApiKey === null) {
		return false;
	}

	const providedBuffer = Buffer.from(providedApiKey);
	const expectedBuffer = Buffer.from(expectedApiKey);

	return (
		providedBuffer.length === expectedBuffer.length &&
		timingSafeEqual(providedBuffer, expectedBuffer)
	);
}

export async function POST(request: Request) {
	const expectedApiKey = process.env.BLOG_REVALIDATE_API_KEY;
	if (!expectedApiKey) {
		return NextResponse.json(
			{ error: "Missing BLOG_REVALIDATE_API_KEY environment variable." },
			{ status: 500 },
		);
	}

	const providedApiKey = request.headers.get("x-api-key");
	if (!hasValidApiKey(providedApiKey, expectedApiKey)) {
		return NextResponse.json(
			{ error: "Unauthorized. Provide a valid x-api-key header." },
			{ status: 401 },
		);
	}

	revalidatePath("/");

	return NextResponse.json({
		revalidated: true,
		path: "/",
		revalidatedAt: new Date().toISOString(),
	});
}
