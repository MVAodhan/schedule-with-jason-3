/* eslint-disable react/display-name */
"use client";

import { getMonthValue } from "@/lib/my-utils";
import { setHours, setMinutes } from "date-fns";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = () => {
	const [selectedDateTime, setSelectedDateTime] = useState(new Date());

	// eslint-disable-next-line react/display-name
	const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
		<button
			className="p-1 rounded border border-black bg-gray-50"
			onClick={onClick}
			ref={ref}
		>
			{value}
		</button>
	));

	const handleCalendarClose = () => {
		const splitDate = selectedDateTime.toString().split(" ");
		const monthChars = splitDate[1];
		const monthValue = getMonthValue(monthChars);
		const calDate = splitDate[2];
		const calYear = splitDate[3];
		const calTime = splitDate[4];
	};

	return (
		<DatePicker
			selected={selectedDateTime}
			onChange={(date) => {
				setSelectedDateTime(date);
			}}
			customInput={<ExampleCustomInput />}
			showTimeSelect
			minTime={setHours(setMinutes(new Date(), 30), 7)}
			maxTime={setHours(setMinutes(new Date(), 0), 11)}
			dateFormat="dd/MM/yyyy HH:mm"
			withPortal
			onCalendarClose={handleCalendarClose}
		/>
	);
};

export default CustomDatePicker;
