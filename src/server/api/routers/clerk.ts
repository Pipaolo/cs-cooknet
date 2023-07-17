import { router } from "@trpc/server/src";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

/**
 * This will be used for consuming the clerk webhooks
 */
const clerkRouter = createTRPCRouter({});

export { clerkRouter };
