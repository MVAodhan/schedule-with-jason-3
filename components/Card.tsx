"use client";

import { Episode } from "@prisma/client";
import { getDates } from "@/lib/my-utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { TSessionUser, UpdatePayload } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useDisabled } from "@/lib/hooks";

const Card = ({ episode, title }: { episode: Episode; title: String }) => {
	const [usDate, setUsDate] = useState<string>("");
	const [nzDate, setNzDate] = useState<string>("");
	const [user, setUser] = useState<TSessionUser | null>();
	const { data: session } = useSession();
	const [guest, setGuest] = useState<Guest | null>();

	const router = useRouter();

	const disabled = useDisabled(user!);
	useEffect(() => {
		let { usDate, nzDate } = getDates(episode.date);
		setUsDate(usDate);
		setNzDate(nzDate);
		if (session) {
			setUser(session.user);
		}
		setGuest(episode.guest as unknown as Guest);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const deleteFn = async () => {
		const payload: UpdatePayload = {
			episodeId: episode.id,
			type: "delete",
		};
		await fetch(`/api/delete`, {
			method: "POST", // Specify the HTTP method
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// Stringify the object
				payload,
			}),
		});

		router.push("/");
	};

	return (
		<div className="card w-full bg-white shadow-xl mx-auto   mb-10">
			<div className="card-body ">
				<div className="flex justify-around">
					<Link href={`/edit/${episode.sanityId}`}>
						<button className="btn bg-transparent hover:bg-transparent">
							<AiFillEdit className="fill-black" />
						</button>
					</Link>

					<button
						onClick={deleteFn}
						disabled={disabled}
						className={`${
							disabled === true
								? "disabled cursor-none"
								: "btn bg-transparent hover:bg-transparent"
						}`}
					>
						<AiOutlineDelete className="fill-red-700" />
					</button>
				</div>

				<h2 className="card-title">{episode.title}</h2>
				<p>Name: {guest?.name}</p>
				<div className="flex flex-row ">
					<div className="w-1/2">US Date: {usDate}</div>
					<div>NZ Date: {nzDate}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
