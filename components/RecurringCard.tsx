"use client";

import { Episode } from "@prisma/client";
import { getDates } from "@/lib/my-utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";

import { RxReset } from "react-icons/rx";

import "react-datepicker/dist/react-datepicker.css";

import CustomDatePicker from "./CustomDatePicker";
import { useDisabled } from "@/lib/hooks";
import { RiCheckboxCircleFill } from "react-icons/ri";

const Card = ({ episode }: { episode: Episode; title: String }) => {
  const [usDate, setUsDate] = useState<string>("");
  const [nzDate, setNzDate] = useState<string>("");

  const [guest, setGuest] = useState<Guest | null>();

  const disabled = useDisabled();

  useEffect(() => {
    let { usDate, nzDate } = getDates(episode.date);

    setUsDate(usDate);
    setNzDate(nzDate);

    setGuest(episode.guest as unknown as Guest);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = async () => {
    const opt = confirm("Do you want to reset date");

    if (opt) {
      const reset = await fetch(`api/episode/${episode.id}/reset`, {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          id: episode.id,
        }),
      });
    }
  };

  return (
    <div className="card w-full shadow-xl mx-auto mb-10 bg-gray-100">
      <div className="card-body">
        <div className="flex justify-around">
          <Link href={`/edit/${episode.sanityId}`}>
            <button className="btn bg-transparent hover:bg-transparent">
              <AiFillEdit className="fill-black" />
            </button>
          </Link>
          <button
            className=" bg-transparent hover:bg-transparent"
            disabled={disabled}
            onClick={() => {
              handleReset();
            }}
          >
            <RxReset className="text-black" />
          </button>
        </div>
        <h2 className="card-title">{episode.title}</h2>
        <p>Name: {guest?.name}</p>

        <div className="flex flex-row ">
          <div className="w-1/2 flex items-center">
            US Date:{" "}
            <CustomDatePicker
              episodeId={episode.id}
              sanityId={episode.sanityId}
              utcDate={episode.date}
            />
          </div>
          <div className="w-1/2 flex items-center">
            NZ Date: <span className="ml-2">{nzDate}</span>
          </div>
        </div>
        <div className="flex justify-around mt-5">
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
