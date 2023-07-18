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
