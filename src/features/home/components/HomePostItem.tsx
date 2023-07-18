import { IconButton, Image, Tooltip, useToast } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import { TRPCClientError } from "@trpc/client";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { type Post } from "~/features/posts";
import { api } from "~/utils/api";

interface Props {
  post: Post;
}

export const HomePostItem = ({ post }: Props) => {
  const { user } = useUser();
  const toggleLike = api.post.toggleLike.useMutation();
  const getOneLikes = api.post.getOneLikes.useQuery({
    postId: post.id,
  });

  const trpcUtils = api.useContext();

  const toast = useToast();
  const likes = useMemo(() => {
    return getOneLikes.data ?? [];
  }, [getOneLikes.data]);

  const isLiked = useMemo(() => {
    if (!likes) return false;
    if (!user) return false;

    return !!likes.find((like) => like.author.clerkId === user.id);
  }, [user, likes]);

  const onLikePressed = async () => {
    try {
      await toggleLike.mutateAsync({
        postId: post.id,
      });

      toast({
        title: "Success",
        status: "success",
        duration: 3000,
      });

      await trpcUtils.post.getOneLikes.invalidate({
        postId: post.id,
      });
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className="flex rounded-lg border bg-white p-4 shadow">
      <div className="flex w-full flex-col">
        <div className="flex flex-row items-center space-x-2">
          <Image
            className="relative h-12 w-12 rounded-full"
            src={post.author.profileUrl}
            alt="profile"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{post.author.email}</span>
            <span className="text-sm text-gray-500">
              {DateTime.fromJSDate(post.createdAt).toLocaleString(
                DateTime.DATE_FULL
              )}
            </span>
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          <span className="line-clamp-6 text-sm">{post.content}</span>
        </div>
        {/* Actions */}
        <div className="mt-2 flex flex-row items-center space-x-2">
          <Tooltip label={isLiked ? "Remove Like" : "Like"}>
            <IconButton
              className="rounded-full fill-none"
              colorScheme="stone"
              aria-label="Like"
              variant={"ghost"}
              isLoading={toggleLike.isLoading || getOneLikes.isLoading}
              onClick={() => void onLikePressed()}
              icon={
                <div className="flex items-center space-x-2 px-2">
                  {isLiked ? (
                    <AiOutlineHeart className="h-5 w-5" />
                  ) : (
                    <AiFillHeart className="h-5 w-5" />
                  )}
                  <span className="text-sm">
                    {likes.length > 0 ? likes.length : 0}
                  </span>
                </div>
              }
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
