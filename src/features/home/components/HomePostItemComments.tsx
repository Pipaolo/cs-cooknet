import { api } from "~/utils/api";
import { type Post } from "~/features/posts";

interface Props {
  post: Post;
}

export const HomePostItemComments = ({ post }: Props) => {
  const comments = api.post.getOnePostComments.useQuery({
    postId: post.id,
  });

  const renderComments = () => {
    if (comments.isLoading) {
      return (
        <div className="grid place-content-center p-4 text-gray-400">
          <span className="font-medium text-white">Fetching Comments...</span>
        </div>
      );
    }

    if (comments?.data?.length === 0) {
      return (
        <div className=" grid place-content-center p-4 text-gray-400">
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
      <div className="relative flex h-full max-h-64 w-full flex-col overflow-y-auto overflow-x-hidden bg-white">
        {renderComments()}
      </div>
    </div>
  );
};
