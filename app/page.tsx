"use client";

import Card from "@/components/Card";
import RecurringCard from "@/components/RecurringCard";

import { Episode } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
	const [episodes, setEpisodes] = useState([]);

	useEffect(() => {
		const getEpisodes = async () => {
			const res = await fetch(`/api/episodes`);
			const episodes = await res.json();
			setEpisodes(episodes);
		};
		getEpisodes();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center  px-24">
			<div className="w-full flex flex-col items-center">
				<h2 className="text-2xl mb-10">Recurring Episode</h2>
				{episodes.map((ep: Episode) => {
					if (ep.title === "Building Web Demos + Q&A") {
						return (
							<RecurringCard key={ep.sanityId} episode={ep} title={ep.title} />
						);
					}
				})}
			</div>
			<div className="w-full flex flex-col items-center">
				<h2 className="text-2xl mb-10">Episodes</h2>
				{episodes.map((ep: Episode) => {
					if (ep.title !== "Building Web Demos + Q&A") {
						return <Card key={ep.sanityId} episode={ep} title={ep.title} />;
					}
				})}
			</div>
		</main>
	);
}
