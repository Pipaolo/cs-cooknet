import { z } from "zod";

export const RecipeBookCreateSchema = z.object({
  title: z.string().min(1).max(255),
});

export type RecipeBookCreateSchema = z.infer<typeof RecipeBookCreateSchema>;
