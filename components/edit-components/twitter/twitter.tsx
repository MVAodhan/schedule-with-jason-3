"use client";

import { TSessionUser, UpdatePayload } from "@/lib/types";
import { getHighlightText } from "@/lib/my-utils";
import { Episode } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { VscCopy } from "react-icons/vsc";
import { useDisabled } from "@/lib/hooks";

const Twitter = ({ episode, guest }: { episode: Episode; guest: Guest }) => {
	const copyText = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	const [user, setUser] = useState<TSessionUser | null>();
	const techRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const { data: session } = useSession();

	const disabled = useDisabled(user!);

	useEffect(() => {
		if (session) {
			setUser(session.user);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateTech = async () => {
		let episodeId = episode.id;
		const payload: UpdatePayload = {
			episodeId: episodeId!,
			tech: techRef.current?.value!,
			type: "tech",
		};
		const updated = await fetch(`/api/episode/${episode.sanityId}`, {
			method: "POST",
			body: JSON.stringify(payload),
		});
		router.push("/");
	};

	return (
		<div>
			<div className="w-full flex flex-col items-center">
				<label className="label"></label>
				<input
					defaultValue={episode.tech ? episode.tech : ""}
					type="text"
					ref={techRef}
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs bg-white"
				/>
				<button
					className="btn btn-outline mt-5"
					onClick={updateTech}
					disabled={disabled}
				>
					Update technology
				</button>
			</div>
			{episode.tech && (
				<div className="flex mt-10 items-center justify-center w-full">
					<label>Highlight Tweet</label>
					<VscCopy
						className="cursor-pointer pl-1 h-8 w-8"
						onClick={() => {
							copyText(
								getHighlightText(
									guest.twitter,
									episode.tech ? episode.tech : "tech not found",
									`${episode.uri}`
								)
							);
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default Twitter;
