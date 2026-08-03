import { ScriptOnce, useHydrated } from "@tanstack/react-router";
import React from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

const THEME_OPTIONS = ["light", "dark", "system"] as const;
const THEMES = ["light", "dark"] as const;
const DEFAULT_THEME_STORAGE_KEY = "ui-theme" as const;
const PREFERS_DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)" as const;

export type ThemeOption = (typeof THEME_OPTIONS)[number];
export type Theme = (typeof THEMES)[number];

const parseThemeOption = (value: string): ThemeOption =>
	THEME_OPTIONS.find((theme) => theme === value) ?? "system";

type ThemeContext =
	| {
			theme: ThemeOption;
			setTheme: (theme: ThemeOption) => void;
	  }
	| undefined;

const ThemeContext = React.createContext<ThemeContext>(undefined);

export const useTheme = () => {
	const context = React.use(ThemeContext);

	if (!context) throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};

type ThemeProviderProps = React.PropsWithChildren<{
	defaultTheme?: ThemeOption;
	storageKey?: string;
}>;

export function ThemeProvider({
	defaultTheme = "system",
	storageKey = DEFAULT_THEME_STORAGE_KEY,
	children,
}: ThemeProviderProps) {
	const hydrated = useHydrated();

	const [storedTheme, setStoredTheme] = useLocalStorage<ThemeOption>(
		storageKey,
		defaultTheme,
		{
			serializer: (value) => value,
			deserializer: parseThemeOption,
		},
	);

	const prefersDark = useMediaQuery(PREFERS_DARK_MEDIA_QUERY, {
		initializeWithValue: false,
	});

	React.useLayoutEffect(() => {
		// ? SSR: match server prefers-dark snapshot
		if (!hydrated) return;

		const systemTheme = prefersDark ? "dark" : "light";
		const theme = storedTheme === "system" ? systemTheme : storedTheme;

		const root = window.document.documentElement;
		root.classList.remove(...THEMES);
		root.classList.add(theme);
	}, [hydrated, prefersDark, storedTheme]);

	const value = React.useMemo(
		() => ({
			theme: hydrated ? storedTheme : "system",
			setTheme: setStoredTheme,
		}),
		[hydrated, storedTheme, setStoredTheme],
	);

	return (
		<ThemeContext.Provider value={value}>
			{/* SSR: Apply the theme to the root element before hydration to avoid flashing incorrect theme */}
			<ScriptOnce>{`(${themeScript.toString()})();`}</ScriptOnce>

			{children}
		</ThemeContext.Provider>
	);
}

function themeScript() {
	try {
		const THEME_OPTIONS = ["light", "dark", "system"];
		const THEMES = ["light", "dark"];

		const storedTheme =
			THEME_OPTIONS.find(
				(theme) => theme === localStorage.getItem("ui-theme"),
			) ?? "system";

		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const systemTheme = prefersDark ? "dark" : "light";
		const themeClass = storedTheme === "system" ? systemTheme : storedTheme;

		document.documentElement.classList.remove(...THEMES);
		document.documentElement.classList.add(themeClass);
	} catch {
		document.documentElement.classList.remove(...THEMES);
		document.documentElement.classList.add("light");
	}
}
