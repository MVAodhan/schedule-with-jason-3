"use client";

import Card from "@/components/Card";

import { Episode } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const adminUser = process.env.NEXT_PUBLIC_ADMIN_USER;

export default function Home() {
	const { data: session } = useSession();
	const [episodes, setEpisodes] = useState([]);

	useEffect(() => {
		const getEpisodes = async () => {
			const res = await fetch(`/api/episodes`);
			const episodes = await res.json();
			setEpisodes(episodes);
		};
		getEpisodes();
	}, []);
	if (session) {
		console.log(session);
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{episodes.map((ep: Episode) => {
				if (ep.title !== "Building Web Demos + Q&A") {
					return (
						<Card
							key={ep.sanityId}
							episode={ep}
							title={ep.title}
							disabled={session?.user?.name === adminUser ? false : true}
						/>
					);
				}
			})}
		</main>
	);
}
