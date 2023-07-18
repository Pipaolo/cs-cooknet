import { Button, Heading, Skeleton, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { PostsCreateFormModal, PostsListItem } from "~/features";
import RecipesAppBar from "~/features/recipes/components/RecipesAppBar";
import { api } from "~/utils/api";

const PostsPage = () => {
  const createPostDisclosure = useDisclosure();
  const posts = api.post.getAll.useQuery();

  const renderContent = () => {
    if (posts.isLoading) {
      return Array.from({ length: 10 }).map((_, index) => {
        return (
          <Skeleton
            key={index}
            className="aspect-square rounded"
            height={"125px"}
          />
        );
      });
    }

    return posts.data?.map((post) => {
      return <PostsListItem key={post.id} post={post} />;
    });
  };

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <main className="flex h-full min-h-screen w-full flex-col">
        <RecipesAppBar />
        <div className="container flex h-full w-full flex-col space-y-4 self-center p-4">
          <div className="col-span-2 flex justify-between sm:col-span-4">
            <Heading className="col-span-4" size="lg">
              Posts
            </Heading>
            <Button colorScheme="stone" onClick={createPostDisclosure.onOpen}>
              New Post
            </Button>
          </div>
          {renderContent()}
        </div>
      </main>
      <PostsCreateFormModal {...createPostDisclosure} />
    </>
  );
};

export default PostsPage;
