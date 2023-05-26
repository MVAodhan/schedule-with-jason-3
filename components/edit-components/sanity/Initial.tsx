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
		<>
			<div className="flex">
				<div className="mt-5 flex justify-center">
					US Date: {usDate ? usDate : "no date"}
				</div>
				<div className="mt-5 pl-10">NZ Date: {nzDate ? nzDate : "no date"}</div>
			</div>
			<div className="flex mt-1 items-center w-full">
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
			<div className="flex items-center justify-center w-full mt-1">
				<input
					type="text"
					defaultValue={guest.name}
					ref={nameRef}
					className="input input-bordered "
				/>
				<VscCopy
					className="cursor-pointer pl-1 h-8 w-8"
					onClick={() => {
						copyValue(nameRef);
					}}
				/>
			</div>
			<div className="flex my-1 items-center w-full">
				<textarea
					className="textarea textarea-bordered w-full "
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
		</>
	);
};

export default Initial;
