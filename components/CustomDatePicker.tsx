/* eslint-disable react/display-name */
"use client";

import { getMonthValue, getUtcDate } from "@/lib/my-utils";
import { UpdatePayload } from "@/lib/types";
import { setHours, setMinutes } from "date-fns";
import { useRouter } from "next/navigation";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({
	episodeId,
	sanityId,
}: {
	episodeId: number;
	sanityId: string;
}) => {
	const [selectedDateTime, setSelectedDateTime] = useState(new Date());

	// eslint-disable-next-line react/display-name
	const ExampleCustomInput = forwardRef((onClick, ref) => (
		<button
			className="p-1 rounded border border-black bg-gray-50"
			onClick={onClick}
			ref={ref}
		>
			{/* {value} */} Select Next Airing Date
		</button>
	));

	const router = useRouter();

	const handleCalendarClose = async () => {
		const splitDate = selectedDateTime.toString().split(" ");
		const monthChars = splitDate[1];
		const monthValue = getMonthValue(monthChars);
		const calDate = splitDate[2];
		const calYear = splitDate[3];
		const calTime = splitDate[4];

		const [hour, minutes, _] = calTime.split(":");
		const utc = getUtcDate(calYear, monthValue, calDate, hour, minutes);
		const payload: UpdatePayload = {
			episodeId: episodeId,
			type: "date",
			date: utc,
		};
		router.push("/");
	};

	return (
		<DatePicker
			// selected={selectedDateTime}
			onChange={(date) => {
				setSelectedDateTime(date!);
			}}
			customInput={<ExampleCustomInput />}
			showTimeSelect
			minTime={setHours(setMinutes(new Date(), 30), 7)}
			maxTime={setHours(setMinutes(new Date(), 0), 11)}
			dateFormat="dd/MM/yyyy HH:mm"
			withPortal
			onCalendarClose={handleCalendarClose}
			shouldCloseOnSelect={false}
		/>
	);
};

export default CustomDatePicker;
