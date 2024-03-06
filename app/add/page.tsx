"use client";

import { useDisabled } from "@/lib/hooks";

import { getUtcDate } from "@/lib/my-utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CustomDateAddPicker from "@/components/CustomDateAddPicker";

const Page = () => {
  const { data: session } = useSession();
  const guestRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const guestHandleRef = useRef<HTMLInputElement | null>(null);
  const textDescRef = useRef<HTMLTextAreaElement | null>(null);
  const twitterDescRef = useRef<HTMLTextAreaElement | null>(null);
  const [addDateTime, setAddDateTime] = useState<string>("");
  const [addError, setAddError] = useState("");

  const disabled = useDisabled();

  const router = useRouter();

  const addScheduled = async () => {
    // deconstructing date and time ref to construct date for db
    const payload = {
      guest: guestRef.current?.value,
      date: addDateTime,
      description: textDescRef.current?.value,
      twitter_description: twitterDescRef.current?.value,
      guest_twitter: guestHandleRef.current?.value,
      title: titleRef.current?.value,
    };
    const scheduled = await fetch("/api/schedule", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    router.push("/");
  };

  return (
    <main className="w-screen h-screen flex flex-col items-center bg-slate-50">
      <section className="w-full  md:w-10/12 flex flex-col items-center">
        <div className="w-[750px] rounded-md flex flex-col items-center mt-10">
          <div className="w-full h-full flex flex-col items-center ">
            <div className="w-full flex flex-col items-center">
              <div className="flex flex-col items-center justify-center w-1/2">
                <label className="label">Guest</label>
                <input
                  ref={guestRef}
                  type="text"
                  className="input input-bordered w-full max-w-xs bg-slate-50"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-1/2">
                <label className="label">
                  Guest Twitter (no @ e.g jlengstorf)
                </label>
                <input
                  ref={guestHandleRef}
                  type="text"
                  className="input input-bordered w-full max-w-xs bg-slate-50"
                />
              </div>
            </div>
            <label className="label">Title</label>
            <input
              ref={titleRef}
              type="text"
              className="input input-bordered w-full max-w-xs bg-slate-50"
            />
            <div className="w-full flex justify-center">
              <div className="flex flex-col items-center justify-center w-1/2 my-2">
                <CustomDateAddPicker
                  addDateTime={addDateTime}
                  setAddDateTime={setAddDateTime}
                />
              </div>
            </div>
            <label className="label"> Twitter Description</label>
            <textarea
              ref={twitterDescRef}
              className="textarea textarea-bordered w-3/5 bg-slate-50"
            ></textarea>
            <label className="label"> Text Description</label>
            <textarea
              ref={textDescRef}
              className="textarea textarea-bordered w-3/5 bg-slate-50"
            ></textarea>

            <button
              className={`btn mt-5 ${
                disabled === true
                  ? "disabled cursor-none bg-red-100 border-none"
                  : ""
              }`}
              disabled={disabled}
              onClick={addScheduled}
            >
              Schedule
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
