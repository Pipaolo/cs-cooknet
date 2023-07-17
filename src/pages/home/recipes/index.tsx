import Head from "next/head";
import { RecipesContainer } from "~/features";
import RecipesAppBar from "~/features/recipes/components/RecipesAppBar";

const RecipesPage = () => {
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <main className="flex h-full min-h-screen w-full flex-col">
        <RecipesAppBar />
        <RecipesContainer />
      </main>
    </>
  );
};

export default RecipesPage;
