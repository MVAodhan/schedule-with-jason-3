"use client";

import { Episode } from "@prisma/client";
import { Suspense, useEffect, useState } from "react";

interface Params {
	id: string;
}
const Page = ({ params }: { params: Params }) => {
	const [episode, setEpisode] = useState<Episode | null>(null);

	useEffect(() => {
		const getEpisode = async () => {
			const res = await fetch(`/api/episode/${params.id}`);
			const episode = await res.json();
			setEpisode(episode);
		};
		getEpisode();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(episode);
	return (
		<main className="w-screen  flex flex-col items-center">
			<section className="w-full md:w-10/12 flex flex-col items-center ">
				<div className="tabs tabs-boxed  justify-center bg-[#FFFFFF]">
					{episode && <div>{episode.description}</div>}
				</div>
			</section>
		</main>
	);
};

export default Page;
