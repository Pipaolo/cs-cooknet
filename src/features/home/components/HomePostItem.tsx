import {
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import { TRPCClientError } from "@trpc/client";
import { DateTime } from "luxon";
import Link from "next/link";
import { useMemo } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { ConfirmationModal } from "~/components/modals";
import { type Post } from "~/features/posts";
import { api } from "~/utils/api";

interface Props {
  post: Post;
}

export const HomePostItem = ({ post }: Props) => {
  const { user } = useUser();
  const deleteDisclosure = useDisclosure();
  const deleteOne = api.post.deleteOne.useMutation();
  const toggleLike = api.post.toggleLike.useMutation();
  const getOneLikes = api.post.getOneLikes.useQuery({
    postId: post.id,
  });

  const trpcUtils = api.useContext();

  const toast = useToast();
  const likes = useMemo(() => {
    return getOneLikes.data ?? [];
  }, [getOneLikes.data]);

  const isAuthor = useMemo(() => {
    if (!user) return false;
    return user.id === post.author.clerkId;
  }, [user, post.author.clerkId]);

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

  const onDeleteConfirmed = async () => {
    try {
      await deleteOne.mutateAsync({
        postId: post.id,
      });

      toast({
        title: "Success",
        description: "Post deleted successfully",
        status: "success",
        duration: 3000,
      });

      await trpcUtils.post.getAll.invalidate();
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

  const renderMenuItems = () => {
    if (!isAuthor) return null;

    return (
      <>
        <MenuItem
          onClick={() => {
            deleteDisclosure.onOpen();
          }}
        >
          Delete
        </MenuItem>
      </>
    );
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
            <Link href={`/home/profile?user=${post.authorId}`}>
              <span className="font-semibold hover:underline focus:underline active:underline">
                {post.author.email}
              </span>
            </Link>
            <span className="text-sm text-gray-500">
              {DateTime.fromJSDate(post.createdAt).toLocaleString(
                DateTime.DATE_FULL
              )}
            </span>
          </div>
          <Spacer />
          <Menu>
            <Tooltip label="Actions">
              <MenuButton
                as={IconButton}
                variant={"ghost"}
                className={twMerge([
                  "flex-shrink-0 rounded-full",
                  !isAuthor && "hidden",
                ])}
                icon={<FaEllipsisV className="text-stone-500" />}
              />
            </Tooltip>
            <MenuList className="font-medium">{renderMenuItems()}</MenuList>
          </Menu>
        </div>
        <div className="mt-2 flex flex-col">
          <span className="line-clamp-6 text-sm">{post.content}</span>
        </div>
        <div className="mt-2 flex flex-wrap space-x-2">
          {post.tags.map((tag, i) => {
            return (
              <span
                key={i}
                className="rounded-md border px-2 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            );
          })}
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
      <ConfirmationModal
        {...deleteDisclosure}
        titleText="Delete Post?"
        descriptionText="You cannot undo this action."
        isLoading={deleteOne.isLoading}
        onConfirm={() => void onDeleteConfirmed()}
        onCancel={deleteDisclosure.onClose}
      />
    </div>
  );
};
