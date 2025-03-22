export function hasExpired(date: Date): boolean {
	const currentTime = new Date();
	const sessionExpiryTime = new Date(date);
	return currentTime >= sessionExpiryTime;
}
