const GERMAN_TRANSLITERATIONS: Record<string, string> = {
	ä: "ae",
	ö: "oe",
	ü: "ue",
	ß: "ss",
};

/**
 * Slugs become public Club URLs, so German titles must stay readable:
 * "Rückblick auf März" → "rueckblick-auf-maerz". Payload's default slugify
 * drops every non-ASCII letter instead.
 */
export function slugifyGerman(value: string) {
	return value
		.normalize("NFC")
		.toLowerCase()
		.replace(/[äöüß]/g, (char) => GERMAN_TRANSLITERATIONS[char] ?? char)
		.normalize("NFKD")
		.replace(/[̀-ͯ]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/** `slugField({ slugify })` adapter; leaves non-string input to Payload's required check. */
export function slugifyPostTitle({ valueToSlugify }: { valueToSlugify?: unknown }) {
	return typeof valueToSlugify === "string" ? slugifyGerman(valueToSlugify) : undefined;
}
