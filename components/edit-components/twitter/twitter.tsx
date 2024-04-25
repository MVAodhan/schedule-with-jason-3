"use client";

import { TSessionUser, UpdatePayload } from "@/lib/types";
import { getHighlightText } from "@/lib/my-utils";
import { Episode } from "@prisma/client";

import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import { VscCopy } from "react-icons/vsc";

const Twitter = ({ episode, guest }: { episode: Episode; guest: Guest }) => {
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const techRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  type Tag = {
    id: String;
    label: String;
  };

  const copyTags = (tags: Tag[]) => {
    let tagStr = "";
    for (const tag of tags) {
      tagStr = tagStr + tag.label + ",";
    }

    navigator.clipboard.writeText(tagStr);
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
        <button className="btn btn-outline mt-5" onClick={updateTech}>
          Update technology
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className="btn btn-outline mt-5  "
          onClick={() => copyTags(episode.tags as [])}
        >
          Copy Tags
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
                  episode.slug
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
