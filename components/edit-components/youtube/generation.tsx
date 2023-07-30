"use client";

import { Episode } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import LinkContainer from "./linkContainer";
import { useSession } from "next-auth/react";
import { UpdatePayload, TSessionUser } from "@/lib/types";
import { useDisabled } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const Generation = ({ episode }: { episode: Episode }) => {
	const chaptersRef = useRef<HTMLTextAreaElement>(null);

	// const [episodeId, setEpisodeId] = useState<number>();

	const { data: session } = useSession();

	const disabled = useDisabled();

	const router = useRouter();

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

		router.push("/");
	};
	return (
		<div className="w-full flex justify-center h-full">
			<div className="w-4/5 flex items-center  h-[400px]">
				<div className=" w-1/2  flex flex-col item-center justify-between h-full">
					<div>
						<label className="label flex justify-center">Chapters</label>
						<textarea
							className="textarea textarea-bordered w-full bg-white"
							placeholder="Chapters"
							ref={chaptersRef}
							defaultValue={episode?.chapters ? episode.chapters : ""}
						></textarea>
					</div>
					<button
						className={`btn btn-outline mt-5 bg-blue-700 text-white ${
							disabled ? "disable bg-grey-100" : ""
						}`}
						onClick={updateChapters}
						disabled={disabled}
					>
						Update Chapters
					</button>
				</div>

				<div className="w-1/2 h-[400px] flex flex-col items-center ">
					<LinkContainer episode={episode} />
				</div>
			</div>
		</div>
	);
};

export default Generation;
