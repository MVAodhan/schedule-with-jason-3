"use client";

import { Episode } from "@prisma/client";
import { getDates } from "@/lib/my-utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";

import "react-datepicker/dist/react-datepicker.css";

import { useSession } from "next-auth/react";
import { TSessionUser } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useDisabled } from "@/lib/hooks";
import CustomDatePicker from "./CustomDatePicker";

const Card = ({ episode, title }: { episode: Episode; title: String }) => {
	const [usDate, setUsDate] = useState<string>("");
	const [nzDate, setNzDate] = useState<string>("");
	const [user, setUser] = useState<TSessionUser | null>();
	const { data: session } = useSession();
	const [guest, setGuest] = useState<Guest | null>();

	const [startDate, setStartDate] = useState(new Date());

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

	console.log(disabled);

	const deleteFn = async () => {
		await fetch("/api/episodes", {
			method: "POST", // Specify the HTTP method
			headers: {
				"Content-Type": "application/json",
				// Set the Content-Type header
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
				<p>Name: {guest?.name}</p>
				<CustomDatePicker />
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
							className={`btn ${
								disabled === true
									? "disabled cursor-none bg-gray-200 border-none hover:bg-gray-300"
									: ""
							}`}
						>
							<button
								onClick={deleteFn}
								disabled={disabled}
								className={`${disabled === true ? "disabled cursor-none" : ""}`}
							>
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
