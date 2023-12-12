"use client";

import { VscCopy } from "react-icons/vsc";
import { useRef } from "react";
import { Episode } from "@prisma/client";
import { getEndDate } from "@/lib/my-utils";

const Discord = ({
	episode,
	nzDate,
	guest,
}: {
	episode: Episode;
	nzDate: string;
	guest: Guest;
}) => {
	const titleRef = useRef<HTMLInputElement | null>(null);
	const descRef = useRef<HTMLTextAreaElement | null>(null);
	const endDate = getEndDate(episode.date);
	const poster = `https://www.learnwithjason.dev/${episode.slug}/poster.jpg`;

	const copyValue = (ref: any) => {
		if (ref.current?.value !== null) {
			const string = `LWJ: ${ref.current?.value} with ${guest.name}`;
			navigator.clipboard.writeText(string);
		}
	};

	function downloadPoster() {
		const a = document.createElement("a");
		a.href = poster;
		a.download = "poster.jpg";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

	return (
		<div className="w-full flex flex-col items-center">
			<div className=" flex justify-center items-center">
				Location
				<VscCopy
					className="cursor-pointer pl-1 h-8 w-8"
					onClick={() => {
						navigator.clipboard.writeText("https://twitch.tv/jlengstorf");
					}}
				/>
			</div>
			<div className="flex items-center w-4/5 justify-between mt-5 ">
				<input
					type="text"
					defaultValue={episode.title}
					ref={titleRef}
					className="input input-bordered bg-slate-50 w-full"
				/>
				<VscCopy
					className="cursor-pointer pl-1 h-8 w-8"
					onClick={() => {
						copyValue(titleRef);
					}}
				/>
			</div>

			<div className="flex items-center w-4/5 justify-between m-2">
				<div>Start Time:</div>
				<div>{nzDate ?? nzDate}</div>
			</div>
			<div className="flex items-center w-4/5 justify-between m-2 ">
				<div>End Time:</div>
				<div>{episode.date ? endDate : ""}</div>
			</div>

			<div className="flex items-center w-4/5 justify-between m-2 ">
				<textarea
					className="textarea textarea-bordered w-full bg-slate-50"
					defaultValue={episode.description}
					ref={descRef}
				></textarea>
				<VscCopy
					className="cursor-pointer pl-1 h-8 w-8"
					onClick={() => {
						copyValue(descRef);
					}}
				/>
			</div>
			<div className="mt-5 flex justify-center">
				<a href={poster} target="_blank">
					Poster
				</a>
			</div>
		</div>
	);
};

export default Discord;
