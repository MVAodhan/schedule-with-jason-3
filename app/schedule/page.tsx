"use client";

import ScheduleCard from "@/components/ScheduleCard";
import { Episode } from "@prisma/client";
import { useEffect, useState } from "react";

const Page = () => {
	const [episodes, setEpisodes] = useState([]);

	useEffect(() => {
		const getEpisodes = async () => {
			const res = await fetch(`/api/schedule`);
			const episodes = await res.json();
			setEpisodes(episodes);
		};
		getEpisodes();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<main className="flex w-full min-h-screen flex-col items-center ">
			<h2 className="text-2xl mb-10">Episodes For Scheduling</h2>
			{episodes?.map((ep: Episode) => {
				if (ep.title !== "Building Web Demos + Q&A") {
					return <ScheduleCard key={ep.id} episode={ep} title={ep.title} />;
				}
			})}
		</main>
	);
};

export default Page;
