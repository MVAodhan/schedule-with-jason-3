"use client";

import { getDates } from "@/lib/utils";

// import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { TSessionUser } from "@/lib/types";
import { useRouter } from "next/navigation";

const copyText = (text: string) => {
	navigator.clipboard.writeText(text);
};
const ScheduleCard = ({ episode, title }: { episode: any; title: String }) => {
	const [usDate, setUsDate] = useState<string>("");
	const [nzDate, setNzDate] = useState<string>("");
	const [user, setUser] = useState<TSessionUser | null>();
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		let { usDate, nzDate } = getDates(episode.date);
		setUsDate(usDate);
		setNzDate(nzDate);
		if (session) {
			setUser(session.user);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const deleteFn = async () => {
		const res = await fetch(`/api/delete/`, {
			method: "POST", // Specify the HTTP method
			headers: {
				"Content-Type": "application/json", // Add this line
			},
			body: JSON.stringify({
				// Stringify the object
				id: episode.id,
			}),
		});

		router.push("/");
	};

	return (
		<div className="card w-full bg-base-100 shadow-xl mx-auto ring ring-[#FF9EB1] mb-10">
			<div className="card-body ">
				<div className="flex justify-around">
					<button className="btn bg-transparent" onClick={deleteFn}>
						<AiOutlineDelete className="fill-red-700" />
					</button>
				</div>

				<h2 className="card-title" onClick={() => copyText(episode.title)}>
					{episode.title}
				</h2>
				<div className="flex ">
					<p onClick={() => copyText(episode.guest_name)}>
						Name: {episode.guest_name}
					</p>
					<p onClick={() => copyText(episode.guest_twitter)}>
						Twitter: {episode.guest_twitter}
					</p>
				</div>
				<div className="flex flex-row ">
					<div className="w-1/2">US Date: {usDate}</div>
					<div>NZ Date: {nzDate}</div>
				</div>
				<p onClick={() => copyText(episode.description)}>
					{episode.description}
				</p>
			</div>
		</div>
	);
};

export default ScheduleCard;
