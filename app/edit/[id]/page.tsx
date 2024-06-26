"use client";

import Calendar from "@/components/edit-components/calendar/calendar";
import Sanity from "@/components/edit-components/container";
import Discord from "@/components/edit-components/discord/Discord";
import Twitter from "@/components/edit-components/twitter/twitter";
import Youtube from "@/components/edit-components/youtube/youtube";
import { getDates } from "@/lib/my-utils";
import { Episode } from "@prisma/client";

import { useEffect, useState } from "react";

interface Params {
  id: string;
}

const tabs = [
  { header: "Sanity Details", id: "sanity" },
  { header: "Calendar Details", id: "calendar" },
  { header: "Discord Details", id: "discord" },
  { header: "Youtube Details", id: "youtube" },
  { header: "Twitter Details", id: "twitter" },
];

const Page = ({ params }: { params: Params }) => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [activeTab, setActiveTab] = useState<string>("sanity");
  const [usDate, setUsDate] = useState<string>("");
  const [nzDate, setNzDate] = useState<string>("");
  const [guest, setGuest] = useState<any>({});

  useEffect(() => {
    const getEpisode = async () => {
      const res = await fetch(`/api/episode/${params.id}`, {
        cache: "no-store",
      });
      const episode = await res.json();
      setEpisode(episode);
    };
    getEpisode();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (episode) {
      const { usDate, nzDate } = getDates(episode.date);
      setUsDate(usDate);
      setNzDate(nzDate);
      setGuest(episode.guest as unknown as Guest);
    }
  }, [episode]);

  const renderTab = () => {
    switch (activeTab) {
      case "calendar":
        return (
          <Calendar
            episode={episode!}
            usDate={usDate}
            nzDate={nzDate}
            guest={guest}
          />
        );
      case "youtube":
        return <Youtube episode={episode!} />;
      case "twitter":
        return <Twitter episode={episode!} guest={guest} />;
      case "discord":
        return <Discord episode={episode!} nzDate={nzDate} guest={guest} />;
      default:
        return (
          <Sanity
            episode={episode!}
            usDate={usDate}
            nzDate={nzDate}
            guest={guest}
          />
        );
    }
  };
  return (
    <main className="w-screen min-h-screen flex flex-col items-center bg-slate-50 text-sm">
      <section className="w-full h-full flex flex-col items-center  ">
        <div className="tabs tabs-boxed justify-center bg-slate-50">
          <div className="flex justify-center w-3/5 md:w-full">
            {tabs.map((tab, i) => (
              <a
                key={i}
                className={`tab bg-slate-50 text-xs lg:text-lg ${
                  tab.id === activeTab ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.header}
              </a>
            ))}
          </div>
        </div>
        <div className="w-4/5 rounded-md flex flex-col items-center mt-10">
          {episode && renderTab()}
        </div>
      </section>
    </main>
  );
};

export default Page;
