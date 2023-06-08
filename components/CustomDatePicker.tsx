"use client";

import { setHours, setMinutes } from "date-fns";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = () => {
	const [startDate, setStartDate] = useState(new Date());

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

	const handleChangeRaw = (value) => {};

	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => setStartDate(date)}
			customInput={<ExampleCustomInput />}
			showTimeSelect
			dayClassName={() => "bg-gray-100 rounded rounded-full"}
			minTime={setHours(setMinutes(new Date(), 30), 7)}
			maxTime={setHours(setMinutes(new Date(), 0), 11)}
			onChangeRaw={(event) => handleChangeRaw(event.target.value)}
		/>
	);
};

export default CustomDatePicker;
