"use client";

import { TSessionUser } from "@/lib/types";
import { getUtcDate } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
	const [user, setUser] = useState<TSessionUser | null>();

	const { data: session } = useSession();
	const guestRef = useRef<HTMLInputElement | null>(null);
	const titleRef = useRef<HTMLInputElement | null>(null);
	const guestHandleRef = useRef<HTMLInputElement | null>(null);
	const textDescRef = useRef<HTMLTextAreaElement | null>(null);
	const twitterDescRef = useRef<HTMLTextAreaElement | null>(null);
	const dateRef = useRef<HTMLInputElement | null>(null);
	const timeRef = useRef<HTMLInputElement | null>(null);
	const techRef = useRef<HTMLInputElement | null>(null);

	const router = useRouter();
	useEffect(() => {
		if (session) {
			setUser(session?.user);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const addScheduled = async () => {
		// console.log(guestRef.current?.value);
		// console.log(titleRef.current?.value);
		// console.log(guestHandleRef.current?.value);
		// console.log(twitterDescRef.current?.value);
		// console.log(textDescRef.current?.value);
		// console.log(techRef.current?.value);

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

		console.log(scheduled);
		router.push("/");
	};
	console.log(user);
	return (
		<main className="w-screen  flex flex-col items-center h-screen">
			<section className="w-full h-full md:w-10/12 flex flex-col items-center">
				<div className="ring ring-[#FF9EB1] w-[750px]  rounded-md flex flex-col items-center mt-10">
					<div className="w-full h-full flex flex-col items-center ">
						<div className="w-full flex">
							<div className="flex flex-col items-center justify-center w-1/2">
								<label className="label">Guest</label>
								<input
									ref={guestRef}
									type="text"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
							<div className="flex flex-col items-center justify-center w-1/2">
								<label className="label">
									Guest Twitter (no @ e.g jlengstorf)
								</label>
								<input
									ref={guestHandleRef}
									type="text"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
						</div>

						<label className="label">Title</label>
						<input
							ref={titleRef}
							type="text"
							className="input input-bordered w-full max-w-xs"
						/>
						<div className="w-full flex">
							<div className="flex flex-col items-center justify-center w-1/2">
								<label className="label">Date</label>
								<input
									ref={dateRef}
									type="date"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
							<div className="flex flex-col items-center justify-center w-1/2">
								<label className="label">Time</label>
								<input
									ref={timeRef}
									type="time"
									className="input input-bordered w-full max-w-xs"
								/>
							</div>
						</div>
						<label className="label"> Twitter Description</label>
						<textarea
							ref={twitterDescRef}
							className="textarea textarea-bordered w-3/5"
						></textarea>
						<label className="label"> Text Description</label>
						<textarea
							ref={textDescRef}
							className="textarea textarea-bordered w-3/5"
						></textarea>
						<label className="label">Technology</label>
						<input
							ref={techRef}
							type="text"
							className="input input-bordered w-full max-w-xs"
						/>
						<button
							className="btn mt-5"
							disabled={user?.role !== "admin" ? true : false}
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
