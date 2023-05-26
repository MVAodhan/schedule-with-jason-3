"use client";
import { Episode } from "@prisma/client";
import { getScheduleTime, getScheduleTweet } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

import { VscCopy } from "react-icons/vsc";
import { useSession } from "next-auth/react";

const Calendar = ({
	episode,
	usDate,
	nzDate,
	guest,
}: {
	episode: Episode;
	usDate: string;
	nzDate: string;
	guest: Guest;
}) => {
	// const title = `LWJ: ${episode.title} with ${episode.guest.name}`;

	const titleRef = useRef<HTMLInputElement | null>(null);
	const descRef = useRef<HTMLTextAreaElement | null>(null);
	const twitterDescRef = useRef<HTMLTextAreaElement | null>(null);
	const [twitterText, setTwitterText] = useState<string>("");

	const [twoWeeks, setTwoWeeks] = useState<string>("");
	const [ninetyMinutes, setNinetyMinutes] = useState<string>("");

	const copyValue = (ref: any) => {
		if (ref.current?.value !== null) {
			const string = ref.current?.value.toString() as string;
			navigator.clipboard.writeText(string);
		}
	};

	const { data: session } = useSession();

	useEffect(() => {
		setTwoWeeks(getScheduleTime(episode.date));
		setNinetyMinutes(getScheduleTime(episode.date, "ninetyMinutes"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex flex-col items-center w-3/5">
			<div className="flex mt-5 items-center w-full">
				<input
					type="text"
					defaultValue={episode.title}
					ref={titleRef}
					className="input input-bordered w-full"
				/>
				<VscCopy
					className="cursor-pointer pl-1 h-8 w-8"
					onClick={() => {
						copyValue(titleRef);
					}}
				/>
			</div>
			<div className="flex w-full mt-5">
				<div className="flex w-full justify-between">
					<div>US Date: {usDate ? usDate : "no date"}</div>
					<div>NZ Date: {nzDate ? nzDate : "no date"}</div>
				</div>
			</div>
			<div className="flex w-full justify-around mt-5">
				<div className=" flex justify-center items-center">
					Guest invite
					<VscCopy
						className="cursor-pointer pl-1 h-8 w-8"
						onClick={() => {
							navigator.clipboard.writeText(
								"lengstorf.com_9plj1m6u9vtddldoinl0hs2vgk@group.calendar.google.com"
							);
						}}
					/>
				</div>
				<div className="flex justify-center items-center">
					Guest Twitter
					<VscCopy
						className="cursor-pointer pl-1 h-8 w-8"
						onClick={() => {
							navigator.clipboard.writeText(guest.twitter);
						}}
					/>
				</div>
				<div className=" flex justify-center items-center">
					Location
					<VscCopy
						className="cursor-pointer pl-1 h-8 w-8"
						onClick={() => {
							navigator.clipboard.writeText("https://twitch.tv/jlengstorf");
						}}
					/>
				</div>
			</div>

			<div className="flex mt-5 items-center w-full">
				<textarea
					className="textarea textarea-bordered w-full "
					defaultValue={episode.description}
					ref={descRef}
				></textarea>

				<button>
					<VscCopy
						className="cursor-pointer pl-1 h-8 w-8"
						onClick={() => {
							copyValue(descRef);
						}}
					/>
				</button>
			</div>

			<div className="flex flex-col my-5 items-center w-full">
				<label>Enter a twitter description to get sceduling tweets</label>
				<textarea
					className="textarea textarea-bordered w-full"
					ref={twitterDescRef}
					onChange={() =>
						setTwitterText(twitterDescRef.current?.value as string)
					}
				></textarea>
			</div>
			{twitterText.length > 1 && (
				<>
					<div className="w-full mt-10 mb-10 flex justify-between">
						<div className="flex flex-col items-center">
							{twoWeeks}
							<div className="flex">
								<label className="label">Two Weeks</label>
								<VscCopy
									className="cursor-pointer pl-1 h-8 w-8"
									onClick={() => {
										let tweet = getScheduleTweet(
											"twoWeeks",
											twitterText,
											episode.uri
										);
										navigator.clipboard.writeText(tweet);
									}}
								/>
							</div>
						</div>
						<div className="flex flex-col items-center">
							<div className="flex ">
								<label className="label">90 Mins</label>
								<VscCopy
									className="cursor-pointer pl-1 h-8 w-8"
									onClick={() => {
										let tweet = getScheduleTweet(
											"ninetyMinutes",
											twitterText,
											episode.uri
										);
										navigator.clipboard.writeText(tweet);
									}}
								/>
							</div>
							{ninetyMinutes}
						</div>
						<div className="flex flex-col items-center ">
							{usDate}
							<div className="flex ">
								<label className="label">Live</label>
								<VscCopy
									className="cursor-pointer pl-1 h-8 w-8"
									onClick={() => {
										let tweet = getScheduleTweet("Live", twitterText);
										navigator.clipboard.writeText(tweet);
									}}
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Calendar;
