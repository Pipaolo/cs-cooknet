import Head from "next/head";
import RecipesAppBar from "~/features/recipes/components/RecipesAppBar";

const RecipesCreatePage = () => {
  return (
    <>
      <Head>
        <title>Create Recipe</title>
      </Head>
      <main className="flex h-full min-h-screen w-full flex-col">
        <RecipesAppBar />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h3 className="text-2xl font-bold">Create Recipes Page</h3>
          <div className="text-lg">This is the recipes page!!!</div>
        </div>
      </main>
    </>
  );
};

export default RecipesCreatePage;
