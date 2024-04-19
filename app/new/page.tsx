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
  const techRef = useRef<HTMLInputElement | null>(null);
  const [addDateTime, setAddDateTime] = useState<string>("");
  const [addError, setAddError] = useState("");

  const tagInputRef = useRef<HTMLInputElement | null>(null);

  type TTags = {
    id: string;
    label: string;
  };
  const [tags, setTags] = useState<TTags[]>([]);
  const disabled = useDisabled();

  const router = useRouter();

  function slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
      .replace(/[^a-z0-9 -]/g, "-") // remove any non-alphanumeric characters
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-"); // remove consecutive hyphens
    return str;
  }

  const addScheduled = async () => {
    const slug = slugify(titleRef.current?.value as string);

    const uri = `https://www.learnwithjason.dev/${slug}`;

    const id = uuidv4();
    const payload = {
      guest: {
        name: guestRef.current?.value,
        image: "",
        twitter: guestHandleRef.current?.value,
      },
      host: {},
      sanityId: id,
      date: addDateTime,
      description: textDescRef.current?.value,
      twitter_description: twitterDescRef.current?.value,
      title: titleRef.current?.value,
      tags: [],
      slug: slug,
      uri: uri,
    };
    const scheduled = await fetch("/api/new", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    router.push("/");
  };

  const addTag = (e: any) => {
    e.preventDefault();
    const tag = {
      id: uuidv4(),
      label: e.target[0].value,
    };

    setTags((prev) => [...prev, tag]);
    e.target[0].value === "";
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
              onClick={() => {
                if (addDateTime === "") {
                  alert("Add a date to add to episodes");
                } else {
                  addScheduled();
                }
              }}
            >
              Schedule
            </button>
            <form onSubmit={addTag} className="mt-5">
              <div className="flex flex-col items-center">
                <div className="flex flex-col justify-center gap-2">
                  <label htmlFor="tagInput">Tags </label>
                  <input
                    type="text"
                    name="tagInput"
                    id="tagInput"
                    className="bg-transparent py-2 px-2 border rounded-md border-gray-400 focus:outline-none"
                  ></input>
                  <div className="flex gap-2 max-w-[250px] flex-wrap">
                    {tags &&
                      tags.map((tag) => (
                        <div className="badge" key={tag.id}>
                          {" "}
                          {tag.label}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
