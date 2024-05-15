"use client";

import { Episode } from "@prisma/client";
import { getDates } from "@/lib/my-utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { RiCheckboxCircleFill } from "react-icons/ri";

import { UpdatePayload } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useDisabled } from "@/lib/hooks";

const Card = ({ episode }: { episode: Episode }) => {
  const [usDate, setUsDate] = useState<string>("");
  const [nzDate, setNzDate] = useState<string>("");

  const [guest, setGuest] = useState<Guest | null>();

  const router = useRouter();

  const isDisabled = useDisabled();

  useEffect(() => {
    let { usDate, nzDate } = getDates(episode.date);
    setUsDate(usDate);
    setNzDate(nzDate);

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
    <div className="card w-full bg-gray-100 shadow-xl mx-auto   mb-10">
      <div className="card-body">
        <div className="flex justify-around">
          <Link href={`/edit/${episode.sanityId}`}>
            <button className="btn bg-transparent hover:bg-transparent">
              <AiFillEdit className="fill-black" />
            </button>
          </Link>

          <button
            onClick={deleteFn}
            className={`
              `}
            disabled={isDisabled}
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
        <div className="flex justify-around">
          {episode.schedule_tweet === true &&
            episode.ninety_minute_tweet === true &&
            episode.live_tweet === true && (
              <div className="flex flex-col justify-around items-center">
                <h2> Buffer</h2>
                <RiCheckboxCircleFill className="fill-green-500 h-[50px] w-[50px]" />
              </div>
            )}
          {episode.discord_event === true && (
            <div className="flex flex-col justify-around items-center">
              <h2> Discord </h2>
              <RiCheckboxCircleFill className="fill-green-500 h-[50px] w-[50px]" />
            </div>
          )}
          {episode.website === true && (
            <div className="flex flex-col justify-around items-center">
              <h2> Website </h2>
              <RiCheckboxCircleFill className="fill-green-500 h-[50px] w-[50px]" />
            </div>
          )}
          {episode.calendar_event === true && (
            <div className="flex flex-col justify-around items-center">
              <h2> Calendar Event </h2>
              <RiCheckboxCircleFill className="fill-green-500 h-[50px] w-[50px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
