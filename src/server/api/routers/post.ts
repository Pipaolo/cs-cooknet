import { PostsCreateSchema } from "~/features/posts/types";
import { createTRPCRouter, privateProcedure } from "../trpc";

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
  createOne: privateProcedure
    .input(PostsCreateSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: ctx.user.id,
          tags: input.tags.map((tag) => tag.name),
        },
      });
    }),
});
