"use client";

import { TLink, TSessionUser } from "@/lib/types";
import { Episode } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "./link";

const LinkContainer = ({ episode }: { episode: Episode }) => {
	const [show, setShow] = useState<Boolean>(false);
	const [links, setLinks] = useState<any>([]);

	const demoRef = useRef<HTMLInputElement>(null);
	const repoRef = useRef<HTMLInputElement>(null);
	const [user, setUser] = useState<TSessionUser | null>();

	const { data: session } = useSession();
	if (session) {
		setUser(session.user);
	}
	const addLink = () => {
		setLinks([...links, { id: uuidv4(), value: "" }]);
	};

	useEffect(() => {
		if (episode.links) {
			setLinks(episode.links);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleLinkChange = (id: string, newValue: string) => {
		setLinks((prevLinks: TLink[]) =>
			prevLinks.map((link: TLink) =>
				link.id === id ? { ...link, value: newValue } : link
			)
		);
	};
	const updateLinks = async () => {
		console.log(links);
		let uniqueLinks = [];
		if (links) {
			uniqueLinks = links.filter(
				(obj: { value: string }, index: any, self: any[]) =>
					self.findIndex((v) => v.value === obj.value) === index
			);
		}
		console.log(uniqueLinks);
		// await axios.post("/api/update-links", {
		// 	ep: episode,
		// 	links: links,
		// 	demo: demoRef.current?.value,
		// 	repo: repoRef.current?.value,
		// });
		// console.log(uniqueLinks);
	};
	return (
		<div className="w-full flex flex-col items-center ">
			<div className="form-control">
				<label className="label cursor-pointer ">
					<span className="label-text mr-10">Add Repo & Demo</span>
					<input
						type="checkbox"
						className="toggle"
						onChange={() => {
							setShow(!show);
						}}
						checked={show ? true : false}
					/>
				</label>
			</div>
			{show && (
				<div>
					<div className="w-full flex  items-center">
						<label className="label">Demo</label>
						<input
							defaultValue={JSON.stringify(episode.demo)}
							type="text"
							ref={demoRef}
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs"
						/>
					</div>
					<div className="w-full flex  items-center">
						<label className="label">Repo</label>
						<input
							// defaultValue={episode.repo}
							type="text"
							ref={repoRef}
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs"
						/>
					</div>
				</div>
			)}
			<div>
				<button className="btn btn-outline mt-5" onClick={addLink}>
					Add Link
				</button>
			</div>
			<div className=" max-h-48 overflow-scroll overflow-x-hidden w-full">
				{links.length > 0 &&
					links.map((link: TLink) => {
						return (
							<Link key={link.id} link={link} onLinkChange={handleLinkChange} />
						);
					})}
			</div>
			{links.length > 0 && (
				<div>
					<button
						className="btn btn-outline"
						// onClick={updateLinks}
						disabled={user?.role !== "admin" ? true : false}
					>
						Edit Links
					</button>
					<button onClick={updateLinks}>Log links</button>
				</div>
			)}
		</div>
	);
};

export default LinkContainer;
