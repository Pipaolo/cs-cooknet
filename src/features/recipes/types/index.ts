import { z } from "zod";
import { validationErrors } from "~/utils/errors";
export const RecipeCreateSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  ingredients: z.array(
    z.object({
      value: z.string().min(1, {
        message: validationErrors.required,
      }),
    })
  ),
  videoUrls: z.array(
    z.object({
      value: z
        .string()
        .min(1, {
          message: validationErrors.required,
        })
        .url({
          message:
            "Please enter a valid URL. Example: https://www.youtube.com/watch?v=QwievZ1Tx-8",
        }),
    })
  ),
});

export type RecipeCreateSchema = z.infer<typeof RecipeCreateSchema>;
