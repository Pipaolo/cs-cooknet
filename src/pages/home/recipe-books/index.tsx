import { Button, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import RecipesAppBar from "~/features/recipes/components/RecipesAppBar";
import { api } from "~/utils/api";

const RecipeBooksPage = () => {
  const recipeBooks = api.recipeBook.getAll.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });

  return (
    <>
      <Head>
        <title>Recipe Books</title>
      </Head>
      <main className="flex h-full min-h-screen w-full flex-col">
        <RecipesAppBar />
        <div className="flex h-full w-full flex-grow flex-col items-center justify-center p-4">
          <div className=" flex h-full w-full flex-grow flex-col space-y-4 rounded-md p-4">
            <div className="container grid h-full w-full grid-cols-2 gap-4 self-center sm:grid-cols-4">
              <div className="col-span-4 flex w-full items-center justify-between">
                <Heading size="lg">Recipes Books</Heading>

                <Button colorScheme="stone">
                  <Link href={"/home/recipe-books/create"}>
                    Add Recipe Book
                  </Link>
                </Button>
              </div>
              {/* Content */}
              {recipeBooks.data?.map((recipeBook) => (
                <div
                  key={recipeBook.id}
                  className="flex flex-col rounded p-4 shadow"
                >
                  <Heading size="md">{recipeBook.title}</Heading>
                  <Text>Recipes in book: {recipeBook.recipes.length}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RecipeBooksPage;
