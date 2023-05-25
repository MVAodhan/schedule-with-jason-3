"use client";

import { Episode } from "@prisma/client";
import { getDates } from "@/lib/utils";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";

const Card = ({
	episode,
	title,
	disabled,
}: {
	episode: Episode;
	title: String;
	disabled: boolean;
}) => {
	const [usDate, setUsDate] = useState<string>("");
	const [nzDate, setNzDate] = useState<string>("");

	useEffect(() => {
		let { usDate, nzDate } = getDates(episode.date);
		setUsDate(usDate);
		setNzDate(nzDate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const deleteFn = async () => {
		await fetch("/api/episodes", {
			method: "POST", // Specify the HTTP method
			headers: {
				"Content-Type": "application/json", // Set the Content-Type header
			},
			body: JSON.stringify({
				// Stringify the object
				id: episode.id,
			}),
		});
	};

	return (
		<div className="card w-full bg-base-100 shadow-xl mx-auto ring ring-[#FF9EB1] mb-10">
			<div className="card-body ">
				<div className="flex justify-around">
					<Link href={`/edit/${episode.sanityId}`}>
						<button className="btn bg-transparent hover:bg-transparent">
							<AiFillEdit className="fill-black" />
						</button>
					</Link>

					<label
						htmlFor={`modal-id${episode.id}`}
						className="btn bg-transparent hover:bg-transparent"
					>
						<AiOutlineDelete className="fill-red-700" />
					</label>
				</div>

				<h2 className="card-title">{episode.title}</h2>
				<p>Name</p>
				<div className="flex flex-row ">
					<div className="w-1/2">US Date: {usDate}</div>
					<div>NZ Date: {nzDate}</div>
				</div>
			</div>
			<input
				type="checkbox"
				id={`modal-id${episode.id}`}
				className="modal-toggle"
			/>
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">
						<span className="text-red-500">Delete</span> {title}?
					</h3>
					<p className="py-4"></p>
					<div className="modal-action flex justify-around">
						<label
							htmlFor={`modal-id${episode.id}`}
							className="btn cursor-none bg-red-700"
						>
							<button onClick={deleteFn} disabled={disabled}>
								Yes
							</button>
						</label>
						<label htmlFor={`modal-id${episode.id}`} className="btn">
							No
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
