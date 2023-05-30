import { z } from "zod";

export const updateValidator = z.object({
	episodeId: z.number(),
	chapters: z.string().optional(),
	type: z.union([z.literal("links"), z.literal("chapters"), z.literal("tech")]),
	links: z
		.array(
			z.object({
				id: z.string(),
				value: z.string(),
			})
		)
		.optional(),
	demo: z.string().optional(),
	repo: z.string().optional(),
	tech: z.string().optional(),
});
