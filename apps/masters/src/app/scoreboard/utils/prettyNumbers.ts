export function prettyNumbers(number: number | undefined) {
	if (!number) {
		number = 0;
	}

	return number.toFixed(2).toString();
}
