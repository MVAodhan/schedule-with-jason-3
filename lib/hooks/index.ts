import { useSession } from "next-auth/react";

export const useDisabled = () => {
	const { data: session } = useSession();

	const userRole = session?.user?.role;
	let disabled: boolean;
	if (
		process.env.NEXT_PUBLIC_ENVIRONMENT === "Development" ||
		userRole === "admin"
	) {
		disabled = false;
	} else {
		disabled = true;
	}

	return disabled;
};
