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

	return { usDate, nzDate, pstZonedDateTime };
}

type TTweetType = "twoWeeks" | "ninetyMinutes" | "Live";
export const getScheduleTweet = (
	tweetType: TTweetType,
	twitter_description?: string,
	slug?: string
) => {
	let title;
	let footer;

	if (tweetType === "twoWeeks") {
		title = "📣 Just Scheduled! 📣";
		footer = "⬇️ Details Here ⬇️";
	} else if (tweetType === "ninetyMinutes") {
		title = "⚠️ In 90 Mins! ⚠️";
		footer = "⬇️ Details Here ⬇️";
	} else {
		title = "🔴 Live! 🔴";
		footer = "⬇️ Watch Live Here 👀";
		slug = "https://www.twitch.tv/jlengstorf";
	}
	const tweet = `${title}
${twitter_description}

${footer}
${slug}
`;

	return tweet;
};

export const getScheduleTime = (date: string, tweetType?: TTweetType) => {
	const { pstZonedDateTime } = getDates(date);
	// Convert the ZonedDateTime object to a JavaScript Date object
	const pstDate = new Date(pstZonedDateTime.epochMilliseconds);

	// Subtract two weeks (in milliseconds) from the PST date
	let milliseconds = 1000 * 60 * 60 * 24 * 14;
	if (tweetType === "ninetyMinutes") {
		milliseconds = 1000 * 60 * 90;
	}
	const twoWeeksAgoDate = new Date(pstDate.getTime() - milliseconds);

	// Convert the two weeks ago date back to a ZonedDateTime object
	const twoWeeksAgo = Temporal.Instant.fromEpochMilliseconds(
		twoWeeksAgoDate.getTime()
	).toZonedDateTime({
		timeZone: "America/Los_Angeles",
		calendar: "gregory",
	});

	const localString = twoWeeksAgo.toLocaleString("en-NZ");

	const parts = localString.split(" ");

	const formattedDateTimeString = parts[0] + " " + parts[1];

	return formattedDateTimeString;
};
