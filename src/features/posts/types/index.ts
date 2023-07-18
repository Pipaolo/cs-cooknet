import { z } from "zod";
import { type RouterOutputs } from "~/utils/api";

export const PostsCreateTagSchema = z.object({
  name: z.string().min(1).max(255),
});

export const PostsCreateSchema = z.object({
  content: z.string().min(1),
  tags: z.array(PostsCreateTagSchema),
});

export type PostsCreateSchema = z.infer<typeof PostsCreateSchema>;

export const PostsAddCommentSchema = z.object({
  postId: z.string(),
  content: z.string(),
});

export type PostsAddCommentSchema = z.infer<typeof PostsAddCommentSchema>;

export type Post = RouterOutputs["post"]["getAll"][0];
export type PostComment = RouterOutputs["post"]["getOnePostComments"][0];
