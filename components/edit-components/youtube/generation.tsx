"use client";

import { Episode } from "@prisma/client";

import { useRef } from "react";
import LinkContainer from "./linkContainer";
import { useSession } from "next-auth/react";
import { ChaptersPayload } from "@/lib/types";

const Generation = ({ episode }: { episode: Episode }) => {
	const chaptersRef = useRef<HTMLTextAreaElement>(null);
	const { data: session } = useSession();

	const updateChapters = async () => {
		const payload: ChaptersPayload = {
			episodeId: episode.id,
			chapters: chaptersRef.current?.value!,
		};
		const updated = await fetch(`/api/episode/${episode.sanityId}`, {
			method: "POST",
			body: JSON.stringify(payload),
		});
	};
	return (
		<div className="w-full flex justify-center">
			<div className="w-4/5 flex items-center  h-[400px]">
				<div className=" w-1/2  flex flex-col item-center justify-between h-full">
					<div>
						<label className="label flex justify-center">Chapters</label>
						<textarea
							className="textarea textarea-bordered w-full"
							placeholder="Chapters"
							ref={chaptersRef}
							defaultValue={episode.chapters ? episode.chapters : ""}
						></textarea>
					</div>
					<button
						className="btn btn-outline mt-5"
						onClick={updateChapters}
						disabled={session?.user?.role !== "admin" ? true : false}
					>
						Update Chapters
					</button>
				</div>

				<div className="w-1/2 flex flex-col items-center">
					{/* <LinkContainer episode={episode} />
					 */}
					Link Container
				</div>
			</div>
		</div>
	);
};

export default Generation;
