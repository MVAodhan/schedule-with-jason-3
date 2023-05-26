"use client";

import Calendar from "@/components/edit-components/calendar/calendar";
import Sanity from "@/components/edit-components/container";
import { getDates } from "@/lib/utils";
import { Episode } from "@prisma/client";
import { useEffect, useState } from "react";

interface Params {
	id: string;
}

const tabs = [
	{ header: "Sanity Details", id: "sanity" },
	{ header: "Calendar Details", id: "calendar" },
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
			const res = await fetch(`/api/episode/${params.id}`);
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
			// case "youtube":
			// 	return <Youtube episode={episode} />;
			// case "twitter":
			// 	return <Twitter episode={episode} />;
			default:
				// return "default";
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
		<main className="w-screen  flex flex-col items-center h-screen">
			<section className="w-full h-full md:w-10/12 flex flex-col items-center">
				<div className="tabs tabs-boxed  justify-center bg-[#FFFFFF]">
					<div>
						{tabs.map((tab, i) => (
							<a
								key={i}
								className={`tab ${tab.id === activeTab ? "tab-active" : ""}`}
								onClick={() => setActiveTab(tab.id)}
							>
								{tab.header}
							</a>
						))}
					</div>
				</div>
				<div className="ring ring-[#FF9EB1] w-[750px]  rounded-md flex flex-col items-center mt-10">
					{episode && renderTab()}
				</div>
			</section>
		</main>
	);
};

export default Page;
