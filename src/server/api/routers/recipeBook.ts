import { RecipeBookCreateSchema } from "~/features/recipeBooks/types";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";

export const recipeBookRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.prisma.recipeBook.findMany({
      where: {
        authorId: ctx.user.id,
      },
      include: {
        recipes: true,
      },
    });
  }),
  createOne: privateProcedure
    .input(RecipeBookCreateSchema)
    .mutation(async ({ ctx, input }) => {
      const recipeBook = await ctx.prisma.recipeBook.create({
        data: {
          authorId: ctx.user.id,
          title: input.title,
        },
      });

      return recipeBook;
    }),
  addRemoveRecipeFromRecipeBook: privateProcedure
    .input(
      z.object({
        type: z.enum(["add", "remove"]),
        recipeId: z.string(),
        recipeBookId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const recipeBook = await ctx.prisma.recipeBook.findUnique({
        where: {
          id: input.recipeBookId,
        },
        include: {
          recipes: true,
        },
      });

      if (!recipeBook) {
        throw new Error("Recipe book not found");
      }

      const recipe = await ctx.prisma.recipe.findUnique({
        where: {
          id: input.recipeId,
        },
      });

      if (!recipe) {
        throw new Error("Recipe not found");
      }

      if (input.type === "add") {
        await ctx.prisma.recipeBook.update({
          where: {
            id: input.recipeBookId,
          },
          data: {
            recipes: {
              connect: {
                id: input.recipeId,
              },
            },
          },
        });
        return;
      }
      await ctx.prisma.recipeBook.update({
        where: {
          id: input.recipeBookId,
        },
        data: {
          recipes: {
            disconnect: [
              {
                id: input.recipeId,
              },
            ],
          },
        },
      });

      return recipeBook;
    }),

  getAllForForm: privateProcedure.query(async ({ ctx }) => {
    return ctx.prisma.recipeBook.findMany({
      where: {
        authorId: ctx.user.id,
      },
      select: {
        id: true,
        title: true,
      },
    });
  }),
});
