import { Button, Skeleton, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { AppBar } from "~/components/layout";
import { PrivateLayout } from "~/components/layout/PrivateLayout";
import { PostsCreateFormModal } from "~/features";
import { HomePostItem, HomeRecipeItem } from "~/features/home/components";
import { api } from "~/utils/api";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const HomePage = () => {
  const router = useRouter();

  const createPostDisclosure = useDisclosure();
  const posts = api.post.getAll.useQuery();
  const [parent] = useAutoAnimate<HTMLDivElement>();

  const renderContent = () => {
    if (posts.isLoading) {
      return Array.from({ length: 10 }).map((_, index) => {
        return (
          <Skeleton key={index} className="aspect-square h-48 rounded">
            <div className="h-full w-full rounded bg-gray-200"></div>
          </Skeleton>
        );
      });
    }

    return posts.data?.map((post) => {
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
    <>
      <Head>
        <title>CookNet</title>
      </Head>
      <PrivateLayout
        appbar={
          <AppBar>
            <div className="flex space-x-2">
              <Button
                leftIcon={<FaPlus />}
                onClick={createPostDisclosure.onOpen}
                colorScheme="stone"
              >
                Post
              </Button>
              <Button
                leftIcon={<FaPlus />}
                onClick={() => void router.push("/home/recipes/create")}
                colorScheme="stone"
              >
                Recipe
              </Button>
            </div>
          </AppBar>
        }
        containerProps={{
          className: "items-start  rounded-md p-4",
        }}
      >
        <div className="flex w-full flex-col space-y-8" ref={parent}>
          {renderContent()}
        </div>
      </PrivateLayout>

      <PostsCreateFormModal {...createPostDisclosure} />
    </>
  );
};

export default HomePage;
