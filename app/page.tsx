"use client";

import Card from "@/components/Card";
import RecurringCard from "@/components/RecurringCard";
import { useDisabled } from "@/lib/hooks";
import { TSessionUser } from "@/lib/types";

import { Episode } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
	const [episodes, setEpisodes] = useState<Episode[] | null>([]);

	// const { data: session } = useSession();
	const disabled = useDisabled();

	useEffect(() => {
		const getEpisodes = async () => {
			const res = await fetch(`/api/episodes`, { cache: "no-store" });
			const episodes = await res.json();
			setEpisodes(episodes);
		};
		getEpisodes();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSync = async () => {
		const res = await fetch("/api/seed", { cache: "no-store" });
		const { episodesToAdd } = await res.json();
		const newEpisodes = [...episodes!, ...episodesToAdd];
		setEpisodes(newEpisodes);
	};

	return (
		<main className="flex min-h-screen flex-col items-center  px-24">
			<div className="w-full flex flex-col items-center">
				<div className="w-full flex justify-end ">
					<button
						className="rounded-md text-black bg-white shadow-xl p-3 cursor-pointer"
						onClick={handleSync}
						disabled={disabled}
					>
						Sync with Schedule
					</button>
				</div>
				<h2 className="text-2xl mb-10">Recurring Episode</h2>
				{episodes!.map((ep: Episode) => {
					if (ep.title === "Building Web Demos + Q&A") {
						return (
							<RecurringCard key={ep.sanityId} episode={ep} title={ep.title} />
						);
					}
				})}
			</div>
			<div className="w-full flex flex-col items-center">
				<h2 className="text-2xl mb-10">Episodes</h2>
				{episodes!.map((ep: Episode) => {
					if (ep.title !== "Building Web Demos + Q&A") {
						return <Card key={ep.sanityId} episode={ep} />;
					}
				})}
			</div>
		</main>
	);
}
