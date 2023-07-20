import { Heading, Skeleton } from "@chakra-ui/react";
import { type Post } from "~/features/posts";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { HomeRecipeItem } from "./HomeRecipeItem";
import { HomePostItem } from "./HomePostItem";

export const HomePostList = ({
  posts,
  isLoading,
  emptyMessage = "No posts found",
}: {
  emptyMessage?: string;
  posts: Post[];
  isLoading: boolean;
}) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 10 }).map((_, index) => {
        return (
          <Skeleton key={index} className="aspect-square h-48 rounded">
            <div className="h-full w-full rounded bg-gray-200"></div>
          </Skeleton>
        );
      });
    }

    if (posts.length === 0) {
      return (
        <div className="flex h-full w-full flex-grow items-center justify-center  text-center">
          <Heading size="md" className="text-stone-500">
            {emptyMessage}
          </Heading>
        </div>
      );
    }

    return posts.map((post) => {
      switch (post.type) {
        case "RECIPE":
          return <HomeRecipeItem key={post.id} post={post} />;
        case "SOCIAL":
          return <HomePostItem key={post.id} post={post} />;
        default:
          return <div></div>;
      }
    });
  };

  return (
    <div className="flex w-full flex-grow flex-col space-y-8" ref={parent}>
      {renderContent()}
    </div>
  );
};
