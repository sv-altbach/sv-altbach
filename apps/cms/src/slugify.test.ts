import { describe, expect, test } from "vitest";

import { slugifyGerman } from "./slugify";

describe("German Post slugs", () => {
	test.each([
		["Rückblick auf die letzten Monate", "rueckblick-auf-die-letzten-monate"],
		["Schach-Update bis März 2025", "schach-update-bis-maerz-2025"],
		["Größter Erfolg", "groesster-erfolg"],
		["Spielberichte 2. Mannschaft / B- Klasse", "spielberichte-2-mannschaft-b-klasse"],
		[
			"Weihnachtsblitzturniere am Freitag, 20.12.2024 ",
			"weihnachtsblitzturniere-am-freitag-20-12-2024",
		],
		["Café-Turnier", "cafe-turnier"],
		// Decomposed ü (u + U+0308), as pasted from some editors.
		["Rückblick", "rueckblick"],
	])("%s → %s", (title, slug) => {
		expect(slugifyGerman(title)).toBe(slug);
	});
});
