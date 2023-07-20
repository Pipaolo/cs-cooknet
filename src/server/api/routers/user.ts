import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  followOne: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      if (user.id === ctx.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can't follow yourself",
        });
      }

      const isFollowing = await ctx.prisma.user.count({
        where: {
          id: ctx.user.id,
          following: {
            some: {
              id: input.userId,
            },
          },
        },
      });

      if (isFollowing) {
        /// Unfollow
        await Promise.all([
          ctx.prisma.user.update({
            where: {
              id: input.userId,
            },
            data: {
              followers: {
                disconnect: {
                  id: ctx.user.id,
                },
              },
            },
          }),
          ctx.prisma.user.update({
            where: {
              id: ctx.user.id,
            },
            data: {
              following: {
                disconnect: {
                  id: input.userId,
                },
              },
            },
          }),
        ]);
        return false;
      }

      /// Follow

      await Promise.all([
        ctx.prisma.user.update({
          where: {
            id: input.userId,
          },
          data: {
            followers: {
              connect: {
                id: ctx.user.id,
              },
            },
          },
        }),
        ctx.prisma.user.update({
          where: {
            id: ctx.user.id,
          },
          data: {
            following: {
              connect: {
                id: input.userId,
              },
            },
          },
        }),
      ]);

      return true;
    }),

  getOne: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      const followersCount = await ctx.prisma.user.count({
        where: {
          following: {
            some: {
              id: input.userId,
            },
          },
        },
      });

      // Let's check if the logged in user is following the user
      const isFollowing = await ctx.prisma.user.count({
        where: {
          id: ctx.user.id,
          following: {
            some: {
              id: input.userId,
            },
          },
        },
      });

      // Let's check if the user is following the logged in user
      const isFollowedBy = await ctx.prisma.user.count({
        where: {
          id: input.userId,
          following: {
            some: {
              id: ctx.user.id,
            },
          },
        },
      });

      return {
        ...user,
        followersCount,
        isFollowing: Boolean(isFollowing),
        isFollowedBy: Boolean(isFollowedBy),
      };
    }),
});
