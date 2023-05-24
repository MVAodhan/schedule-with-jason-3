import Card from "@/components/Card";
import { Episode } from "@prisma/client";

export default async function Home() {
	const host = process.env.NEXT_PUBLIC_HOST;
	const res = await fetch(`${host}/api/episodes`);
	const episodes = await res.json();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{episodes.map((ep: Episode) => {
				if (ep.title !== "Building Web Demos + Q&A") {
					return <Card key={ep.sanityId} episode={ep} title={ep.title} />;
				}
			})}
		</main>
	);
}
