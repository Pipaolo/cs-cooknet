import {
  PostsAddCommentSchema,
  PostsCreateSchema,
} from "~/features/posts/types";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        recipe: {
          include: {
            ingredients: true,
            recipeBooks: true,
            videoLinks: true,
          },
        },
      },
    });
  }),
  getOneLikes: privateProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.rating.findMany({
        where: {
          postId: input.postId,
        },
        include: {
          author: {
            select: {
              clerkId: true,
            },
          },
        },
      });
    }),
  toggleLike: privateProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
        include: {
          ratings: true,
        },
      });

      if (!post) {
        throw new Error("Post not found");
      }

      const rating = post.ratings.find(
        (rating) => rating.authorId === ctx.user.id
      );

      if (rating) {
        await ctx.prisma.rating.delete({
          where: {
            id: rating.id,
          },
        });
        return;
      }

      await ctx.prisma.rating.create({
        data: {
          authorId: ctx.user.id,
          postId: input.postId,
          value: 1,
        },
      });
    }),
  getOnePostComments: privateProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.comment.findMany({
        where: {
          postId: input.postId,
        },
        include: {
          author: true,
        },
      });
    }),
  addCommentToPost: privateProcedure
    .input(PostsAddCommentSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.comment.create({
        data: {
          content: input.content,
          authorId: ctx.user.id,
          postId: input.postId,
        },
      });
    }),
  createOne: privateProcedure
    .input(PostsCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          content: input.content,
          authorId: ctx.user.id,
          tags: input.tags.map((tag) => tag.name),
          type: "SOCIAL",
        },
      });
    }),
});
