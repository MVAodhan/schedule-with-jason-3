"use client";

import { useState } from "react";
import Initial from "./sanity/Initial";
import Final from "./sanity/Final";

import { Episode } from "@prisma/client";

const tabs = [
	{ header: "Initial Details", id: "init" },
	{ header: "Finishing Details", id: "fin" },
];

const Sanity = ({
	episode,
	usDate,
	nzDate,
	guest,
}: {
	episode: Episode;
	usDate: string;
	nzDate: string;
	guest: Guest;
}) => {
	const [activeTab, setActiveTab] = useState<string>("init");

	const renderTab = () => {
		switch (activeTab) {
			case "fin":
				return <Final />;
			default:
				// return "Init";
				return (
					<Initial
						episode={episode}
						usDate={usDate}
						nzDate={nzDate}
						guest={guest}
					/>
				);
		}
	};

	return (
		<div className="flex flex-col items-center ">
			<div className="tabs tabs-boxed w-full flex justify-center bg-[#FFFFFF] ">
				{tabs.map((tab, i) => (
					<a
						key={i}
						className={`tab ${tab.id === activeTab ? "tab-active" : ""}`}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.header}
					</a>
				))}
			</div>
			{renderTab()}
		</div>
	);
};

export default Sanity;
