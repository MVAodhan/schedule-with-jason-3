import { z } from "zod";
import { updateValidator } from "./schedma";

type UpdatePayload = z.infer<typeof updateValidator>;

type TSessionUser = {
	email?: string | null | undefined;
	image?: string | null | undefined;
	name?: string | null | undefined;
	role?: string | null | undefined;
};

type TLink = {
	id: string;
	value: string | undefined;
};
