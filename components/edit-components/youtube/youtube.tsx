"use client";
import { useState } from "react";

import { Episode } from "@prisma/client";
import Generation from "./generation";

const Youtube = ({ episode }: { episode: Episode }) => {
	const [activeTab, setActiveTab] = useState<string>("generation");
	const renderTab = () => {
		switch (activeTab) {
			case "generation":
				return <Generation episode={episode} />;
			default:
				return "Publishing";
			// return <Publishing episode={episode} />;
		}
	};
	return (
		<div className="flex flex-col items-center w-full">
			<div className="tabs tabs-boxed w-full flex justify-center bg-[#FFFFFF] ">
				<a
					className={`tab ${activeTab === "generation" ? "tab-active" : ""}`}
					onClick={() => setActiveTab("generation")}
				>
					Generation text
				</a>
				<a
					className={`tab ${activeTab === "publishing" ? "tab-active" : ""}`}
					onClick={() => setActiveTab("publishing")}
				>
					Publishing text
				</a>
			</div>
			{renderTab()}
		</div>
	);
};

export default Youtube;
