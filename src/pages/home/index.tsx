import { Button, Heading, Skeleton, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { AppBar } from "~/components/layout";
import { PrivateLayout } from "~/components/layout/PrivateLayout";
import { HomeRecipeItem } from "~/features/home/components";
import { api } from "~/utils/api";

const HomePage = () => {
  const router = useRouter();

  const createPostDisclosure = useDisclosure();
  const createRecipeDisclosure = useDisclosure();
  const recipes = api.recipe.getAll.useQuery();

  const renderContent = () => {
    if (recipes.isLoading) {
      return Array.from({ length: 10 }).map((_, index) => {
        return (
          <Skeleton key={index} className="aspect-square rounded">
            <div className="h-full w-full rounded bg-gray-200"></div>
          </Skeleton>
        );
      });
    }

    return recipes.data?.map((recipe) => {
      return <HomeRecipeItem key={recipe.id} recipePost={recipe} />;
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
        <div className="flex w-full flex-col space-y-8">{renderContent()}</div>
      </PrivateLayout>
    </>
  );
};

export default HomePage;
