import { z } from "zod";

export const chaptersValidator = z.object({
	episodeId: z.number(),
	chapters: z.string(),
});
