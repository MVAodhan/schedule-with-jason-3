"use client";

import { TLink, TSessionUser, UpdatePayload } from "@/lib/types";
import { Episode } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "./link";
import { useDisabled } from "@/lib/hooks";

const LinkContainer = ({ episode }: { episode: Episode }) => {
	const [show, setShow] = useState<Boolean>(false);
	const [links, setLinks] = useState<any>([]);

	const demoRef = useRef<HTMLInputElement>(null);
	const repoRef = useRef<HTMLInputElement>(null);
	const [user, setUser] = useState<TSessionUser | null>();

	const { data: session } = useSession();

	const disabled = useDisabled(user!);

	const addLink = () => {
		setLinks([...links, { id: uuidv4(), value: "" }]);
	};

	useEffect(() => {
		if (episode.links) {
			setLinks(episode.links);
		}
		if (session) {
			setUser(session.user);
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
		let uniqueLinks;
		console.log(links);
		if (links) {
			uniqueLinks = links.filter(
				(obj: { value: string }, index: any, self: any[]) =>
					self.findIndex((v) => v.value === obj.value) === index
			);
		}
		console.log(uniqueLinks);
		let episodeId = episode.id;
		const payload: UpdatePayload = {
			episodeId: episodeId,
			type: "links",
			links: uniqueLinks,
			demo: demoRef.current?.value,
			repo: repoRef.current?.value,
		};
		const updated = await fetch(`/api/episode/${episode.sanityId}`, {
			method: "POST",
			body: JSON.stringify(payload),
		});
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
							defaultValue={episode.demo ? episode.demo : ""}
							type="text"
							ref={demoRef}
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs bg-white"
						/>
					</div>
					<div className="w-full flex  items-center">
						<label className="label">Repo</label>
						<input
							defaultValue={episode.repo ? episode.repo : ""}
							type="text"
							ref={repoRef}
							placeholder="Type here"
							className="input input-bordered w-full max-w-xs bg-white"
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
						onClick={updateLinks}
						disabled={disabled}
					>
						Update Links
					</button>
				</div>
			)}
		</div>
	);
};

export default LinkContainer;
