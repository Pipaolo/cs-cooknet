import { Button, Heading } from "@chakra-ui/react";
import { type RecipePost } from "~/features/recipes/types";
import { DateTime } from "luxon";
import Image from "next/image";
import { HomeRecipeItemComments } from "./HomeRecipeItemComments";

interface Props {
  recipePost: RecipePost;
}

export const HomeRecipeItem = ({ recipePost }: Props) => {
  const formattedDate = DateTime.fromJSDate(
    recipePost.createdAt
  ).toLocaleString(DateTime.DATE_FULL);
  const recipe = recipePost.recipe;

  if (recipe === null) return <div></div>;

  return (
    <div className="grid grid-cols-12 gap-2">
      {/* Header */}
      <div className="col-span-12 flex items-start space-x-2 ">
        <div className="relative h-14 w-14 rounded-full bg-stone-400">
          <img
            src={recipePost.author.profileUrl}
            className="absolute inset-0 "
          />
        </div>
        <div className="flex flex-col">
          <Heading size={"md"}>{recipe.title}</Heading>
          <span className="stone-500 text-sm underline">
            by {recipePost.author.email}
          </span>
          <span className="stone-500 text-sm">{formattedDate}</span>
          <div className="mt-2 flex flex-wrap space-x-2">
            {recipePost.tags.map((tag, i) => {
              return (
                <span
                  key={i}
                  className="rounded-md border px-2 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {/* Image */}
      <div className="relative  col-span-8 h-[400px] overflow-hidden">
        <Image
          fill
          className=" rounded-md object-cover"
          src="https://plus.unsplash.com/premium_photo-1664360228046-a0a7ccf4fb38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="food"
        />
      </div>
      {/* Comments */}
      <HomeRecipeItemComments recipePost={recipePost} />
    </div>
  );
};
