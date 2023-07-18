import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { clerkRouter } from "./routers/clerk";
import { recipeRouter } from "./routers/recipe";
import { recipeBookRouter } from "./routers/recipeBook";
import { postRouter } from "./routers/post";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  clerk: clerkRouter,
  recipe: recipeRouter,
  recipeBook: recipeBookRouter,
  post: postRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
