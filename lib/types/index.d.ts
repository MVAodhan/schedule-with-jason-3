import { z } from "zod";
import { chaptersValidator } from "../zod";

type ChaptersPayload = z.infer<typeof chaptersValidator>;

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
