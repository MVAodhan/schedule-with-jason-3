"use client";

import { VscCopy } from "react-icons/vsc";
import { useRef } from "react";
import { Episode } from "@prisma/client";

const Initial = ({
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
	const nameRef = useRef<HTMLInputElement | null>(null);
	const titleRef = useRef<HTMLInputElement | null>(null);
	const descRef = useRef<HTMLTextAreaElement | null>(null);

	const copyValue = (ref: any) => {
		if (ref.current?.value !== null) {
			const string = ref.current?.value.toString() as string;
			navigator.clipboard.writeText(string);
		}
	};
	return (
		<div className="w-full flex flex-col items-center">
			<div className="flex items-center w-4/5 justify-between m-2 ">
				<div>US Date</div>
				<div>{usDate ? usDate : "no date"}</div>
			</div>
			<div className="flex items-center w-4/5 justify-between m-2 ">
				<div>NZ Date</div>
				<div>{nzDate ? nzDate : "no date"}</div>
			</div>
			<div className="flex items-center w-4/5 justify-between m-2 ">
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
			<div className="flex items-center w-4/5 justify-between m-2 ">
				<input
					type="text"
					defaultValue={guest.name}
					ref={nameRef}
					className="input input-bordered bg-slate-50 w-full"
				/>
				<VscCopy
					className="cursor-pointer pl-1 h-8 w-8"
					onClick={() => {
						copyValue(nameRef);
					}}
				/>
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
		</div>
	);
};

export default Initial;
