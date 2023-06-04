import { TSessionUser } from "../types";

export const useDisabled = (user: TSessionUser) => {
    let disabled = true;
		if (
			process.env.NEXT_PUBLIC_ENVIRONMENT === "Development" ||
			user?.role === "admin"
		) {
			disabled = false;
		}
		return disabled;
};
