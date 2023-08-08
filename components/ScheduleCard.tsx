"use client";

import { getDates } from "@/lib/my-utils";

// import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { TSessionUser } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useDisabled } from "@/lib/hooks";

const copyText = (text: string) => {
	navigator.clipboard.writeText(text);
};
const ScheduleCard = ({ episode, title }: { episode: any; title: String }) => {
	const [usDate, setUsDate] = useState<string>("");
	const [nzDate, setNzDate] = useState<string>("");

	const { data: session } = useSession();
	const router = useRouter();
	const disabled = useDisabled();

	useEffect(() => {
		let { usDate, nzDate } = getDates(episode.date);
		setUsDate(usDate);
		setNzDate(nzDate);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const deleteFn = async () => {
		const res = await fetch(`/api/delete-scheduled`, {
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
		<div className="card w-11/12 shadow-xl mx-auto mb-10">
			<div className="card-body ">
				<div className="flex justify-around">
					<button
						className={`btn bg-transparent${
							disabled === true
								? "disabled cursor-none border-none hover:bg-gray-300"
								: ""
						}`}
						onClick={deleteFn}
					>
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
