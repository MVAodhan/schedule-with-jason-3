"use client";
import { Episode } from "@prisma/client";
import { getScheduleTime, getScheduleTweet } from "@/lib/my-utils";
import { useEffect, useRef, useState } from "react";

import { VscCopy } from "react-icons/vsc";

const Calendar = ({
  episode,
  usDate,
  nzDate,
  guest,
}: {
  episode: Episode;
  usDate: string;
  nzDate: string;
  guest: Guest;
}) => {
  let title;
  if (episode) {
    title = `LWJ: ${episode.title} with ${guest.name}`;
  }

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const twitterDescRef = useRef<HTMLTextAreaElement | null>(null);
  const [twitterText, setTwitterText] = useState<string>("");

  const [twoWeeks, setTwoWeeks] = useState<string>("");
  const [ninetyMinutes, setNinetyMinutes] = useState<string>("");
  const [twitterDescDafault, setTwitterDescDefault] = useState<string>("");

  const [isScheduledChecked, setIsScheduledChecked] = useState(
    episode.schedule_tweet ? episode.schedule_tweet : false
  );
  const [isNinetyMinuteChecked, setIsNinetyMinuteChecked] = useState(
    episode.ninety_minute_tweet ? episode.ninety_minute_tweet : false
  );
  const [isLiveChecked, setIsLiveChecked] = useState(
    episode.live_tweet ? episode.live_tweet : false
  );

  const copyValue = (ref: any) => {
    if (ref.current?.value !== null) {
      const string = ref.current?.value.toString() as string;
      navigator.clipboard.writeText(string);
    }
  };

  const saveChanges = async () => {
    const payload = {
      id: episode.id,
      twitter_description: twitterDescRef.current?.value,
      schedule_tweet: isScheduledChecked,
      ninety_minute_tweet: isNinetyMinuteChecked,
      live_tweet: isLiveChecked,
    };

    const scheduled = await fetch("/api/save-changes", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  useEffect(() => {
    setTwoWeeks(getScheduleTime(episode.date));
    setNinetyMinutes(getScheduleTime(episode.date, "ninetyMinutes"));
    if (episode.twitter_description) {
      setTwitterDescDefault(episode.twitter_description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex mt-5 items-center w-full">
        <input
          type="text"
          defaultValue={title}
          ref={titleRef}
          className="input input-bordered w-full bg-white"
        />
        <VscCopy
          className="cursor-pointer pl-1 h-8 w-8"
          onClick={() => {
            copyValue(titleRef);
          }}
        />
      </div>
      <div className="flex w-full mt-5">
        <div className="flex w-full justify-between">
          <div>US Date: {usDate ? usDate : "no date"}</div>
          <div>NZ Date: {nzDate ? nzDate : "no date"}</div>
        </div>
      </div>
      <div className="flex w-full justify-around mt-5">
        <div className=" flex justify-center items-center">
          Guest invite
          <VscCopy
            className="cursor-pointer pl-1 h-8 w-8"
            onClick={() => {
              navigator.clipboard.writeText(
                "lengstorf.com_9plj1m6u9vtddldoinl0hs2vgk@group.calendar.google.com"
              );
            }}
          />
        </div>
        <div className="flex justify-center items-center">
          Guest Twitter
          <VscCopy
            className="cursor-pointer pl-1 h-8 w-8"
            onClick={() => {
              navigator.clipboard.writeText(guest.twitter);
            }}
          />
        </div>
        <div className=" flex justify-center items-center">
          Location
          <VscCopy
            className="cursor-pointer pl-1 h-8 w-8"
            onClick={() => {
              navigator.clipboard.writeText("https://twitch.tv/jlengstorf");
            }}
          />
        </div>
      </div>

      <div className="flex mt-5 items-center w-full">
        <textarea
          className="textarea textarea-bordered w-full bg-white"
          defaultValue={episode.description}
          ref={descRef}
        ></textarea>{" "}
        <button>
          <VscCopy
            className="cursor-pointer pl-1 h-8 w-8"
            onClick={() => {
              copyValue(descRef);
            }}
          />
        </button>
      </div>

      <div className="flex flex-col my-5 items-center w-full">
        <label>Enter a twitter description to get sceduling tweets</label>
        <textarea
          className="textarea textarea-bordered w-full bg-white"
          ref={twitterDescRef}
          onChange={() =>
            setTwitterDescDefault(twitterDescRef.current?.value as string)
          }
          defaultValue={twitterDescDafault}
        ></textarea>
      </div>

      {(twitterText.length > 1 || twitterDescDafault.length > 1) && (
        <>
          <div className="w-full mt-10 mb-10 flex justify-between">
            <div className="flex flex-col items-center">
              {twoWeeks}
              <div className="flex">
                <label className="label">Two Weeks</label>
                <VscCopy
                  className="cursor-pointer pl-1 h-8 w-8"
                  onClick={() => {
                    let tweet = getScheduleTweet(
                      "twoWeeks",
                      twitterDescDafault,
                      episode.uri
                    );
                    navigator.clipboard.writeText(tweet);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex ">
                <label className="label">90 Mins</label>
                <VscCopy
                  className="cursor-pointer pl-1 h-8 w-8"
                  onClick={() => {
                    let tweet = getScheduleTweet(
                      "ninetyMinutes",
                      twitterDescDafault,
                      episode.uri
                    );
                    navigator.clipboard.writeText(tweet);
                  }}
                />
              </div>
              {ninetyMinutes}
            </div>
            <div className="flex flex-col items-center ">
              {usDate}
              <div className="flex ">
                <label className="label">Live</label>
                <VscCopy
                  className="cursor-pointer pl-1 h-8 w-8"
                  onClick={() => {
                    let tweet = getScheduleTweet("Live", twitterDescDafault);
                    navigator.clipboard.writeText(tweet);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-10 mb-10 flex justify-between">
            <div className="flex flex-col items-center">
              <div>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    checked={isScheduledChecked}
                    className="checkbox checkbox-accent"
                    onChange={() => {
                      setIsScheduledChecked((prev) => !prev);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    checked={isNinetyMinuteChecked}
                    className="checkbox checkbox-accent"
                    onChange={() => {
                      setIsNinetyMinuteChecked((prev) => !prev);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center ">
              <div>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    checked={isLiveChecked}
                    className="checkbox checkbox-accent"
                    onChange={() => {
                      setIsLiveChecked((prev) => !prev);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </>
      )}
      <button className="btn" onClick={saveChanges}>
        {" "}
        Save Changes
      </button>
    </div>
  );
};

export default Calendar;
