import type { ImageLoaderProps } from "next/image";

export function imageLoader({ src, width, quality }: ImageLoaderProps) {
	return `/${src}?w=${width}&q=${quality || 75}`;
}

export function getPlayerName(playerName: string) {
	return playerName.split(",").reverse().join(" ");
}
