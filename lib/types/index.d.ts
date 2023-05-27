import { z } from "zod";
import { chaptersValidator } from "../zod";

type ChaptersPayload = z.infer<typeof chaptersValidator>;
