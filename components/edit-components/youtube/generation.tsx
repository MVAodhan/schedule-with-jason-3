"use client";

import { Episode } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import LinkContainer from "./linkContainer";
import { useSession } from "next-auth/react";
import { UpdatePayload, TSessionUser } from "@/lib/types";
import { useDisabled } from "@/lib/hooks";

const Generation = ({ episode }: { episode: Episode }) => {
	const chaptersRef = useRef<HTMLTextAreaElement>(null);
	const [user, setUser] = useState<TSessionUser | null>();
	// const [episodeId, setEpisodeId] = useState<number>();

	const { data: session } = useSession();

	const disabled = useDisabled(user!);

	useEffect(() => {
		if (session) {
			setUser(session.user);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const updateChapters = async () => {
		let episodeId = episode.id;
		const payload: UpdatePayload = {
			episodeId: episodeId!,
			chapters: chaptersRef.current?.value!,
			type: "chapters",
		};
		const updated = await fetch(`/api/episode/${episode.sanityId}`, {
			method: "POST",
			body: JSON.stringify(payload),
		});
	};
	return (
		<div className="w-full flex justify-center h-[800px]">
			<div className="w-4/5 flex items-center  h-[400px]">
				<div className=" w-1/2  flex flex-col item-center justify-between h-full">
					<div>
						<label className="label flex justify-center">Chapters</label>
						<textarea
							className="textarea textarea-bordered w-full bg-white"
							placeholder="Chapters"
							ref={chaptersRef}
						></textarea>
					</div>
					<button
						className="btn btn-outline mt-5"
						onClick={updateChapters}
						disabled={disabled}
					>
						Update Chapters
					</button>
				</div>

				<div className="w-1/2 flex flex-col items-center h-full">
					<LinkContainer episode={episode} />
				</div>
			</div>
		</div>
	);
};

export default Generation;
