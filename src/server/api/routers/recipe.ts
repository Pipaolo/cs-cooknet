import { RecipeCreateSchema } from "~/features/recipes/types";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";

export const recipeRouter = createTRPCRouter({
  getAll: privateProcedure
    .input(
      z
        .object({
          query: z.string(),
        })
        .nullish()
    )
    .query(async ({ ctx, input }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        where: {
          OR: !input?.query
            ? undefined
            : [
                {
                  title: {
                    contains: input?.query,
                    mode: "insensitive",
                  },
                },
                {
                  content: {
                    contains: input?.query,
                    mode: "insensitive",
                  },
                },
                {
                  ingredients: {
                    hasSome: [input?.query],
                  },
                },
              ],
        },

        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          recipeBooks: true,
        },
      });

      return recipes;
    }),
  createOne: privateProcedure
    .input(RecipeCreateSchema)
    .mutation(async ({ ctx, input }) => {
      /// https://recipebooks/create/ -> POST
      /**
       * {
          authorId: ctx.user.id,
          content: input.content,
          title: input.title,
          ingredients: input.ingredients.map((ingredient) => ingredient.value),
          videoUrls: input.videoUrls.map((videoUrl) => videoUrl.value),
        },
       */
      const recipe = await ctx.prisma.recipe.create({
        data: {
          authorId: ctx.user.id,
          content: input.content,
          title: input.title,
          ingredients: input.ingredients.map((ingredient) => ingredient.value),
          videoUrls: input.videoUrls.map((videoUrl) => videoUrl.value),
        },
      });

      return recipe;
    }),
});
