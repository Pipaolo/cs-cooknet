import { Button, Heading, Text, Tooltip } from "@chakra-ui/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Head from "next/head";
import Link from "next/link";
import { AppBar } from "~/components/layout";
import { PrivateLayout } from "~/components/layout/PrivateLayout";
import { api } from "~/utils/api";

const RecipeBooksPage = () => {
  const recipeBooks = api.recipeBook.getAll.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });
  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <>
      <Head>
        <title>Recipe Books</title>
      </Head>
      <PrivateLayout
        appbar={
          <AppBar>
            <div className="flex space-x-2">
              <Tooltip label="This feature is currently under development">
                <Button colorScheme="stone" isDisabled>
                  Add Recipe Book
                  {/* <Link href={"/home/recipe-books/create"} aria-disabled>
                 
                  </Link> */}
                </Button>
              </Tooltip>
            </div>
          </AppBar>
        }
        containerProps={{
          className: "items-start  rounded-md p-4",
        }}
      >
        <div
          className="flex w-full flex-grow items-center justify-center"
          ref={parent}
        >
          <Heading size={"md"} className="uppercase text-stone-500">
            This feature is currently under development
          </Heading>
        </div>
        {/* <div className="flex w-full flex-col space-y-4" ref={parent}>
          {recipeBooks.data?.map((recipeBook) => (
            <div
              key={recipeBook.id}
              className="flex flex-col rounded p-4 shadow"
            >
              <Heading size="md">{recipeBook.title}</Heading>
              <Text>Recipes in book: {recipeBook.recipes.length}</Text>
            </div>
          ))}
        </div> */}
      </PrivateLayout>
    </>
  );
};

export default RecipeBooksPage;
