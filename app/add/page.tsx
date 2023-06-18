"use client";

import { useDisabled } from "@/lib/hooks";
import { TSessionUser } from "@/lib/types";
import { getUtcDate } from "@/lib/my-utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Page = () => {
	const { data: session } = useSession();
	const guestRef = useRef<HTMLInputElement | null>(null);
	const titleRef = useRef<HTMLInputElement | null>(null);
	const guestHandleRef = useRef<HTMLInputElement | null>(null);
	const textDescRef = useRef<HTMLTextAreaElement | null>(null);
	const twitterDescRef = useRef<HTMLTextAreaElement | null>(null);
	const dateRef = useRef<HTMLInputElement | null>(null);
	const timeRef = useRef<HTMLInputElement | null>(null);
	const techRef = useRef<HTMLInputElement | null>(null);

	const disabled = useDisabled();

	const router = useRouter();

	const addScheduled = async () => {
		// deconstructing date and time ref to construct date for db
		const [year, month, day] = dateRef.current?.value.split("-")!;
		const [hour, minutes] = timeRef.current?.value.split(":")!;
		const date = getUtcDate(year, month, day, hour, minutes);

		const payload = {
			guest: guestRef.current?.value,
			description: textDescRef.current?.value,
			date: date,
			guest_twitter: guestHandleRef.current?.value,
			title: titleRef.current?.value,
			twitter_description: twitterDescRef.current?.value,
		};

		const scheduled = await fetch("/api/schedule", {
			method: "POST",
			body: JSON.stringify(payload),
		});

		router.push("/");
	};
	return (
		<main className="w-screen  flex flex-col items-center ">
			<section className="w-full  md:w-10/12 flex flex-col items-center">
				<div className="w-[750px]  rounded-md flex flex-col items-center mt-10">
					<div className="w-full h-full flex flex-col items-center ">
						<div className="w-full flex">
							<div className="flex flex-col items-center justify-center w-1/2">
								<label className="label">Guest</label>
								<input
									ref={guestRef}
									type="text"
									className="input input-bordered w-full max-w-xs bg-white"
								/>
							</div>
							<div className="flex flex-col items-center justify-center w-1/2">
								<label className="label">
									Guest Twitter (no @ e.g jlengstorf)
								</label>
								<input
									ref={guestHandleRef}
									type="text"
									className="input input-bordered w-full max-w-xs bg-white"
								/>
							</div>
						</div>

						<label className="label">Title</label>
						<input
							ref={titleRef}
							type="text"
							className="input input-bordered w-full max-w-xs bg-white"
						/>
						<div className="w-full flex">
							<div className="flex flex-col items-center justify-center w-1/2">
								<label className="label">Date</label>
								<input
									ref={dateRef}
									type="date"
									className="input input-bordered w-full max-w-xs bg-white"
								/>
							</div>
							<div className="flex flex-col items-center justify-center w-1/2">
								<label className="label">Time</label>
								<input
									ref={timeRef}
									type="time"
									className="input input-bordered w-full max-w-xs bg-white"
								/>
							</div>
						</div>
						<label className="label"> Twitter Description</label>
						<textarea
							ref={twitterDescRef}
							className="textarea textarea-bordered w-3/5 bg-white"
						></textarea>
						<label className="label"> Text Description</label>
						<textarea
							ref={textDescRef}
							className="textarea textarea-bordered w-3/5 bg-white"
						></textarea>
						<label className="label">Technology</label>
						<input
							ref={techRef}
							type="text"
							className="input input-bordered w-full max-w-xs bg-white"
						/>
						<button
							className={`btn mt-5 ${
								disabled === true
									? "disabled cursor-none bg-red-100 border-none"
									: ""
							}`}
							disabled={disabled}
							onClick={addScheduled}
						>
							Add Episode
						</button>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Page;
