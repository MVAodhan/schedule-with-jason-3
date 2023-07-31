"use client";

import { getCredits } from "@/lib/my-utils";
import { Episode } from "@prisma/client";
import { useEffect, useState } from "react";
import { VscCopy } from "react-icons/vsc";
type Tag = {
	label: string;
	slug: string;
	uri: string;
};
type Link = {
	id: string;
	value: string;
};

const Publishing = ({ episode }: { episode: Episode }) => {
	const [JSONLinks, setJSONLinks] = useState<Link[] | null>();
	const copyText = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	useEffect(() => {
		if (episode.links) {
			const linksArray = episode.links as Link[];
			setJSONLinks(linksArray);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getTags = () => {
		let json;
		if (episode.tags) {
			json = JSON.parse(episode?.tags as string);
		}
		const tagsArray = json.map((tag: Tag) => tag.label);
		let tags: string = "";
		if (tagsArray.length > 1) {
			for (let tag of tagsArray) {
				tags = tags + tag + ",";
			}
		} else {
			tags = tagsArray[0];
		}

		console.log(tags);
		return tags;
	};

	const formatLinks = () => {
		if (JSONLinks && JSONLinks.length > 1) {
			let linkSet = new Set();
			let linkValues = JSONLinks.map(
				(link: Link) => `- ${link.value}`
			) as String[];
			for (let value of linkValues) {
				linkSet.add(value);
			}
			// console.log(linkSet);
			let linksString: any = [];
			linkSet.forEach((link) => {
				if (link !== "- https://www.learnwithjason.dev/schedule") {
					linksString = [...linksString, link];
				}
			});
			// console.log(linksString);
			let uniqueStrings = linksString.join("\n");

			return uniqueStrings;
		}
		return "No links found";
	};

	const youtubeDescription = `
${episode.description}

${episode.demo ? `Demo ${episode.demo}` : ""}

${episode.repo ? `Repo ${episode.repo}` : ""}

Upcoming episodes:
https://lwj.dev/schedule

Links & Resources:

${formatLinks()}

${getCredits()}

${episode.chapters ?? `Chapters: ${episode.chapters}`}`;

	return (
		<div className="flex flex-col items-center w-3/5 m-5">
			<div className="w-full flex flex-col items-center">
				<div className="flex flex-row">
					<label className="label">Title</label>
					<VscCopy
						className="cursor-pointer pl-1 h-8 w-8"
						onClick={() => {
							copyText(episode.title);
						}}
					/>
				</div>
			</div>
			<div className="flex items-center mt-5">
				<label>Youtube Description</label>
				<VscCopy
					className="cursor-pointer pl-1 h-8 w-8"
					// copyText(youtubeDescription);
					onClick={() => {
						copyText(youtubeDescription);
					}}
				/>
			</div>

			<div className="flex items-center mt-5">
				<label>Youtube Tags</label>
				<VscCopy
					className="cursor-pointer pl-1 h-8 w-8"
					onClick={() => {
						copyText(getTags());
					}}
				/>
			</div>
		</div>
	);
};

export default Publishing;
