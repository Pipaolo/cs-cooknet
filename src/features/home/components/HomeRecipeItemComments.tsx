import {
  Button,
  CircularProgress,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { Recipe, type RecipePost } from "~/features/recipes/types";
import { HomeRecipeItemCommentsModal } from "./HomeRecipeItemCommentsModal";
import { api } from "~/utils/api";

interface Props {
  recipePost: RecipePost;
}

export const HomeRecipeItemComments = ({ recipePost }: Props) => {
  const addCommentDisclosure = useDisclosure();
  const comments = api.post.getOnePostComments.useQuery({
    postId: recipePost.id,
  });

  const renderComments = () => {
    if (comments.isLoading) {
      return (
        <div className="absolute inset-0 grid place-content-center bg-black bg-opacity-50">
          <span className="font-medium text-white">Fetching Comments...</span>
        </div>
      );
    }

    if (comments?.data?.length === 0) {
      return (
        <div className="absolute inset-0 grid place-content-center ">
          <span className="font-medium ">No Comments</span>
        </div>
      );
    }

    return comments.data?.map((comment) => {
      return (
        <div
          key={comment.id}
          className="flex max-w-full scroll-pr-4  space-x-2 p-4 pr-16"
        >
          <img
            src={comment.author?.profileUrl}
            className="aspect-square h-10 w-10 rounded-full bg-stone-400"
          />
          <div className="space-y flex max-w-full flex-col">
            <span className="font-bold">{comment.author?.email}</span>
            <span className="w-full break-words text-sm">
              {comment.content}
            </span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className=" col-span-4 flex h-full max-h-[400px] flex-col overflow-hidden rounded-md border ">
      {/* Comments Container */}
      <div className="relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden  bg-white">
        {renderComments()}
      </div>
      {/* Comments Actions */}
      <Divider />
      <div className="flex w-full items-center justify-center p-4 ">
        <Button onClick={addCommentDisclosure.onOpen}>Add Comment</Button>
        <HomeRecipeItemCommentsModal
          {...addCommentDisclosure}
          recipePost={recipePost}
        />
      </div>
    </div>
  );
};
