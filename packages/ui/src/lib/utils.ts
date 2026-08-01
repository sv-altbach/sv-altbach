import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge.
 * This utility function allows for conditional class names and automatically resolves
 * conflicts between Tailwind CSS classes.
 *
 * @param inputs - A list of class values (strings, objects, arrays, etc.)
 * @returns The merged class string
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
