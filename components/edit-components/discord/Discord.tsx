"use client";

import { VscCopy } from "react-icons/vsc";
import { useRef, useState } from "react";
import { Episode } from "@prisma/client";
import { getEndDate, liveLink } from "@/lib/my-utils";

const Discord = ({
  episode,
  nzDate,
  guest,
}: {
  episode: Episode;
  nzDate: string;
  guest: Guest;
}) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const endDate = getEndDate(episode.date);
  const poster = `https://www.learnwithjason.dev/${episode.slug}/poster.jpg`;
  const [discordChecked, setDiscordChecked] = useState(
    episode.discord_event ? episode.discord_event : false
  );

  const copyValue = (ref: any) => {
    if (ref.current?.value !== null) {
      const string = `LWJ: ${ref.current?.value} with ${guest.name}`;
      navigator.clipboard.writeText(string);
    }
  };

  const saveChanges = async () => {
    const payload = {
      id: episode.id,
      discord_event: discordChecked,
    };

    await fetch("/api/save-discord", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className=" flex justify-center items-center">
        Location
        <VscCopy
          className="cursor-pointer pl-1 h-8 w-8"
          onClick={() => {
            navigator.clipboard.writeText(liveLink);
          }}
        />
      </div>
      <div className="flex items-center w-4/5 justify-between mt-5 ">
        <input
          type="text"
          defaultValue={episode.title}
          ref={titleRef}
          className="input input-bordered bg-slate-50 w-full"
        />
        <VscCopy
          className="cursor-pointer pl-1 h-8 w-8"
          onClick={() => {
            copyValue(titleRef);
          }}
        />
      </div>

      <div className="flex items-center w-4/5 justify-between m-2">
        <div>Start Time:</div>
        <div>{nzDate ?? nzDate}</div>
      </div>
      <div className="flex items-center w-4/5 justify-between m-2 ">
        <div>End Time:</div>
        <div>{episode.date ? endDate : ""}</div>
      </div>

      <div className="flex items-center w-4/5 justify-between m-2 ">
        <textarea
          className="textarea textarea-bordered w-full bg-slate-50"
          defaultValue={episode.description}
          ref={descRef}
        ></textarea>
        <VscCopy
          className="cursor-pointer pl-1 h-8 w-8"
          onClick={() => {
            copyValue(descRef);
          }}
        />
      </div>

      <div>
        <label className="cursor-pointer label flex flex-col gap-2 pt-2 text-lg">
          Discord Event Scheduled
          <input
            type="checkbox"
            checked={discordChecked}
            className="checkbox checkbox-accent"
            onChange={() => {
              setDiscordChecked((prev) => !prev);
            }}
          />
        </label>
      </div>
      <div className="mt-5 flex justify-center">
        <a href={poster} target="_blank">
          Poster
        </a>
      </div>
      <button className="btn pt-2" onClick={saveChanges}>
        {" "}
        Save Changes
      </button>
    </div>
  );
};

export default Discord;
