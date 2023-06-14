import { TLink } from "@/lib/types";
import { useRef } from "react";

const Link = ({
	link,
	onLinkChange,
}: {
	link: TLink;
	onLinkChange: Function;
}) => {
	let linkRef = useRef<HTMLInputElement>(null);
	const handleChange = (id: string, newValue: string) => {
		onLinkChange(id, newValue);
	};
	return (
		<div className="w-full flex flex-col items-center">
			<label className="label"></label>
			<input
				defaultValue={link.value}
				type="text"
				ref={linkRef}
				placeholder="Type here"
				className="input input-bordered w-full max-w-xs bg-white"
				onChange={() => {
					handleChange(link.id, linkRef.current?.value || "");
				}}
			/>
		</div>
	);
};

export default Link;
