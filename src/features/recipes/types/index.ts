import { z } from "zod";
import { type RouterOutputs } from "~/utils/api";
import { validationErrors } from "~/utils/errors";

export const RecipeIngredientSchema = z.object({
  name: z.string().min(1, validationErrors.minLength(1)),
  quantity: z.coerce.number().min(0, validationErrors.minLength(0)),
  unit: z.string(),
});

export type RecipeIngredientSchema = z.infer<typeof RecipeIngredientSchema>;

export const RecipeVideoLinkSchema = z.object({
  url: z.string().url({
    message:
      "Please enter a valid URL. Example: https://www.youtube.com/watch?v=QwievZ1Tx-8",
  }),
  label: z.string().min(1, validationErrors.minLength(1)),
});

export type RecipeVideoLinkSchema = z.infer<typeof RecipeVideoLinkSchema>;

export const RecipeCreateSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  tags: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .default([]),
  procedures: z.array(
    z.object({
      value: z.string(),
    })
  ),
  ingredients: z.array(RecipeIngredientSchema).default([]),
  videoUrls: z.array(RecipeVideoLinkSchema).default([]),
});

export type RecipeCreateSchema = z.infer<typeof RecipeCreateSchema>;

export type RecipePost = RouterOutputs["recipe"]["getAll"][0];
export type Recipe = NonNullable<RecipePost["recipe"]>;
