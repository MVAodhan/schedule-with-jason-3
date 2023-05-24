import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";
Date.prototype.toTemporalInstant = toTemporalInstant;

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getDates(date: string) {
	const utcInstant = Temporal.Instant.from(date);
	const pstZonedDateTime = utcInstant.toZonedDateTime({
		timeZone: "America/Los_Angeles",
		calendar: "gregory",
	});
	const nzZonedDateTime = utcInstant.toZonedDateTime({
		timeZone: "Pacific/Auckland",
		calendar: "gregory",
	});
	const usDate = pstZonedDateTime.toLocaleString("en-NZ", {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
	const nzDate = nzZonedDateTime.toLocaleString("en-NZ", {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	return { usDate, nzDate };
}
