import { Button, Heading, Input, Skeleton, Text } from "@chakra-ui/react";
import Image from "next/image";
import { RecipesGridItem } from "./RecipesGridItem";
import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { api } from "~/utils/api";

export const RecipesContainer = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const recipes = api.recipe.getAll.useQuery(
    {
      query: debouncedSearchTerm,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const renderContent = () => {
    if (recipes.isLoading) {
      return (
        <>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className="aspect-square rounded"
              height={"100%"}
              width={"100%"}
            />
          ))}
        </>
      );
    }

    return recipes.data?.map((recipe) => (
      <RecipesGridItem key={recipe.id} recipe={recipe} />
    ));
  };

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center p-4">
      <Input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for recipes"
        className="max-w-md shadow-none focus-within:border-stone-500 focus-within:ring-1 focus-within:ring-stone-500"
      />
      <div className=" flex h-full w-full flex-grow flex-col space-y-4 rounded-md p-4">
        <div className="container grid h-full w-full grid-cols-2 gap-4 self-center sm:grid-cols-4">
          <Heading className="col-span-4" size="lg">
            Recipes
          </Heading>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};
