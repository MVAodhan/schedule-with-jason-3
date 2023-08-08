"use client";

import { Episode } from "@prisma/client";
import { getDates } from "@/lib/my-utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";

import "react-datepicker/dist/react-datepicker.css";

import CustomDatePicker from "./CustomDatePicker";

const Card = ({ episode }: { episode: Episode; title: String }) => {
	const [usDate, setUsDate] = useState<string>("");
	const [nzDate, setNzDate] = useState<string>("");

	const [guest, setGuest] = useState<Guest | null>();

	useEffect(() => {
		let { usDate, nzDate } = getDates(episode.date);
		setUsDate(usDate);
		setNzDate(nzDate);

		setGuest(episode.guest as unknown as Guest);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="card w-full shadow-xl mx-auto mb-10 bg-gray-100">
			<div className="card-body">
				<div className="flex justify-around">
					<Link href={`/edit/${episode.sanityId}`}>
						<button className="btn bg-transparent hover:bg-transparent">
							<AiFillEdit className="fill-black" />
						</button>
					</Link>
				</div>
				<h2 className="card-title">{episode.title}</h2>
				<p>Name: {guest?.name}</p>
				<div className="flex flex-row ">
					<div className="w-1/2 flex items-center">
						US Date:{" "}
						<CustomDatePicker
							episodeId={episode.id}
							sanityId={episode.sanityId}
							utcDate={episode.date}
						/>
					</div>
					<div className="w-1/2 flex items-center">
						NZ Date: <span className="ml-2">{nzDate}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
