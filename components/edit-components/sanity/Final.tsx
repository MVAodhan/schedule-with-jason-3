"use client";
import { VscCopy } from "react-icons/vsc";

const copyText = (text: string) => {
	navigator.clipboard.writeText(text);
};

const captionsBlurb = `*Captions provided by White Coat Captioning (https://whitecoatcaptioning.com/). 
Communication Access Realtime Translation (CART) is provided in order to facilitate
communication accessibility and may not be a totally verbatim record of the proceedings.*`;

const Final = () => {
	return (
		<div>
			{" "}
			<div className="flex my-5 items-center w-full">
				<label>caption disclainmer</label>
				<VscCopy
					className="cursor-pointer pl-1 h-8 w-8"
					onClick={() => {
						copyText(captionsBlurb);
					}}
				/>
			</div>
		</div>
	);
};

export default Final;
