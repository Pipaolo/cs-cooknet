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
      const recipePosts = await ctx.prisma.post.findMany({
        where: {
          type: {
            equals: "RECIPE",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          recipe: {
            include: {
              ingredients: true,
              recipeBooks: true,
              videoLinks: true,
            },
          },
          author: true,
        },
      });

      return recipePosts;
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

      const recipePost = await ctx.prisma.post.create({
        data: {
          authorId: ctx.user.id,
          content: input.content,
          type: "RECIPE",
          tags: input.tags.map((tag) => tag.value),
          recipe: {
            create: {
              title: input.title,
              authorId: ctx.user.id,
              procedures: input.procedures.map((procedure) => procedure.value),
              videoLinks: {
                createMany: {
                  data: input.videoUrls.map((videoUrl) => ({
                    url: videoUrl.url,
                    label: videoUrl.label,
                  })),
                  skipDuplicates: true,
                },
              },
              ingredients: {
                createMany: {
                  data: input.ingredients.map((ingredient) => ({
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit,
                  })),
                  skipDuplicates: true,
                },
              },
            },
          },
        },
      });

      return recipePost;
    }),
});
