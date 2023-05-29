import { z } from "zod";

export const updateValidator = z.object({
	episodeId: z.number(),
	chapters: z.string(),
	type: z.union([z.literal("links"), z.literal("chapters")]),
});
