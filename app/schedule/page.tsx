import ScheduleCard from "@/components/ScheduleCard";
import { Episode } from "@prisma/client";

const Page = async () => {
	const host = process.env.NEXT_PUBLIC_HOST;
	const res = await fetch(`${host}/api/schedule`, {
		method: "GET",
		cache: "no-store",
	});
	const episodes = await res.json();

	console.log(host);
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
