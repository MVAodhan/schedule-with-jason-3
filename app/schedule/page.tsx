import ScheduleCard from "@/components/ScheduleCard";
import { Episode } from "@prisma/client";
import { useEffect, useState } from "react";

const Page = async () => {
	const host = process.env.NEXT_PUBLIC_HOST;
	const res = await fetch(`${host}/api/schedule`, {
		method: "GET",
		cache: "no-store",
	});
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
		<main className="flex min-h-screen flex-col items-center  p-24">
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
