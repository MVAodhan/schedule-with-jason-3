import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";
Date.prototype.toTemporalInstant = toTemporalInstant;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const liveLink = "https://lwj.dev/live";

interface Sponsor {
  name: string;
  slug: string;
}
export const sponsors: Sponsor[] = [
  {
    name: "Netlify",
    slug: "netlify",
  },
  {
    name: "Tuple",
    slug: "tuple",
  },
];

export function getDates(date: string) {
  const utcInstant = Temporal.Instant.from(date ?? "2024-01-01T17:00:00Z");
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
    weekday: "short",
  });
  const nzDate = nzZonedDateTime.toLocaleString("en-NZ", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
  });

  return { usDate, nzDate, pstZonedDateTime };
}

export const getEndDate = (date: any) => {
  const utcInstant = Temporal.Instant.from(date);
  const pstZonedDateTime = utcInstant.toZonedDateTime({
    timeZone: "Pacific/Auckland",
    calendar: "gregory",
  });
  const duration = Temporal.Duration.from({ hours: 1, minutes: 30 });
  // Add the duration to the time
  let newTime = pstZonedDateTime.add(duration);
  let newTimeString = newTime.toLocaleString("en-NZ", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
  });

  return newTimeString;
};

type TTweetType = "twoWeeks" | "ninetyMinutes" | "Live";
export const getScheduleTweet = (
  tweetType: TTweetType,
  twitter_description?: string,
  slug?: string
) => {
  let title;
  let footer;

  if (tweetType === "twoWeeks") {
    title = "📣 Just Scheduled";
    footer = "Details: ";
  } else if (tweetType === "ninetyMinutes") {
    title = "⚠️ In 90 Minutes";
    footer = "Details: ";
  } else {
    title = "🔴 Live";
    footer = "Watch Live: ";
    slug = `${liveLink}`;
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

export const getHighlightText = (
  twitter: string = "",
  tech: string = "",
  slug: string = ""
) => {
  return `Did you miss @${twitter} teaching us about ${tech} live on LWJ?
No worries! Watch highlights from the episode here, then check out the full episode replay https://www.learnwithjason.dev/${slug}`;
};

export const getUtcDate = (
  year: string,
  month: string,
  day: string,
  hour: string,
  minutes: string
) => {
  const zonedDateTime = Temporal.ZonedDateTime.from({
    timeZone: "America/Los_Angeles",
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: Number(hour),
    minute: Number(minutes),
  });

  return zonedDateTime.toInstant().toString();
};

export const getMonthValue = (monthChars: string) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = months.findIndex((el) => el === monthChars);

  return String(monthIndex + 1);
};

export const getSponsors = (sponsors: { name: string; slug: string }[]) => {
  let sponsorLines: any = [];
  for (let sponsor of sponsors) {
    let sponsorLine = `- ${sponsor.name}(https://lwj.dev/${sponsor.slug})`;
    sponsorLines = [...sponsorLines, sponsorLine];
  }

  let formattedSponsors = sponsorLines.join("\n");

  return formattedSponsors;
};
export const getCredits = () => {
  return `Watch future episodes live at ${liveLink}

This episode was sponsored by:
${getSponsors(sponsors)}

Live transcription by White Coat Captioning (https://whitecoatcaptioning.com/)
`;
};
