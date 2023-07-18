import { z } from "zod";

export const PostsCreateTagSchema = z.object({
  name: z.string().min(1).max(255),
});

export const PostsCreateSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  tags: z.array(PostsCreateTagSchema),
});

export type PostsCreateSchema = z.infer<typeof PostsCreateSchema>;
