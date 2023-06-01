"use client";

import Card from "@/components/Card";
import { TSessionUser } from "@/lib/types";

import { Episode } from "@prisma/client";
import { useSession } from "next-auth/react";
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
		<main className="flex min-h-screen flex-col items-center  p-24">
			<h2 className="text-2xl mb-10">Episodes</h2>
			{episodes.map((ep: Episode) => {
				if (ep.title !== "Building Web Demos + Q&A") {
					return <Card key={ep.sanityId} episode={ep} title={ep.title} />;
				}
			})}
		</main>
	);
}
