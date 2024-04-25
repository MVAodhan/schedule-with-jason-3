"use client";

import { Episode } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import LinkContainer from "./linkContainer";

import { UpdatePayload, TSessionUser } from "@/lib/types";

import { useRouter } from "next/navigation";

const Generation = ({ episode }: { episode: Episode }) => {
  const chaptersRef = useRef<HTMLTextAreaElement>(null);

  // const [episodeId, setEpisodeId] = useState<number>();

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
      <div className="w-4/5 h-[700px] flex flex-col ">
        <div className="w-full flex flex-col item-center  px-10">
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
            className={`btn btn-outline mt-5 bg-slate-800 text-white $`}
            onClick={updateChapters}
          >
            Update Chapters
          </button>
        </div>
        <div className="w-full h-[400px] flex flex-col items-center ">
          <LinkContainer episode={episode} />
        </div>
      </div>
    </div>
  );
};

export default Generation;
