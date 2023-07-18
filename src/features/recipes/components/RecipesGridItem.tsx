import {
  Button,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  FaAddressBook,
  FaBookmark,
  FaClipboard,
  FaEllipsisV,
  FaLink,
} from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { api, type RouterOutputs } from "~/utils/api";
import { RecipesExternalLinksModal } from "./RecipesExternalLinksModal";
import { RecipesIngredientsModal } from "./RecipesIngredientsModal";
import { RecipesAddToRecipeBookModal } from "./RecipesAddToRecipeBookModal";
import { type RecipePost } from "../types";

interface Props {
  recipePost: RecipePost;
}

export const RecipesGridItem = ({ recipePost }: Props) => {
  const addToRecipeBookDisclosure = useDisclosure();
  const externalLinksDisclosure = useDisclosure();
  const ingredientsDisclosure = useDisclosure();

  return (
    <div className="flex flex-col space-y-2  rounded border border-black p-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col overflow-hidden">
          <Heading size={"sm"} className="line-clamp-3">
            {recipePost.recipe?.title}
          </Heading>
          <Text className="line-clamp-1">by {recipePost.author.email}</Text>
        </div>
        <div className="flex">
          <Tooltip label="Add to recipe book">
            <IconButton
              onClick={addToRecipeBookDisclosure.onOpen}
              aria-label="Add to recipe book"
              variant={"ghost"}
              className="flex-shrink-0 rounded-full"
              icon={<FaBookmark className="text-stone-500" />}
            />
          </Tooltip>
          <Menu>
            <Tooltip label="Actions">
              <MenuButton
                as={IconButton}
                variant={"ghost"}
                className="flex-shrink-0 rounded-full"
                icon={<FaEllipsisV className="text-stone-500" />}
              />
            </Tooltip>
            <MenuList className="font-medium">
              <MenuItem
                onClick={ingredientsDisclosure.onOpen}
                icon={<GiFruitBowl className="text-stone-500" size={"1rem"} />}
              >
                Ingredients
              </MenuItem>
              <MenuItem
                icon={<FaClipboard className="text-stone-500" size={"1rem"} />}
              >
                Procedure
              </MenuItem>
              <MenuItem
                onClick={externalLinksDisclosure.onOpen}
                icon={<FaLink className="text-stone-500" size={"1rem"} />}
              >
                External Links
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <div className="relative  aspect-square  h-40 overflow-hidden object-cover">
        <Image
          fill
          className=" rounded-md object-cover"
          src="https://plus.unsplash.com/premium_photo-1664360228046-a0a7ccf4fb38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="food"
        />
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-1 text-xs font-semibold">
        {recipePost.tags.map((tag, i) => {
          return (
            <span key={i} className="rounded-md border px-4 py-1">
              {tag}
            </span>
          );
        })}
      </div>
      {/* Description */}
      <div className="rounded-md border p-4">
        <p className="line-clamp-6 break-all ">{recipePost.content}</p>
      </div>
      {recipePost.recipe && (
        <>
          <RecipesAddToRecipeBookModal
            {...addToRecipeBookDisclosure}
            recipe={recipePost.recipe}
          />
          <RecipesExternalLinksModal
            {...externalLinksDisclosure}
            recipe={recipePost.recipe}
          />
          <RecipesIngredientsModal
            {...ingredientsDisclosure}
            recipe={recipePost.recipe}
          />
        </>
      )}
    </div>
  );
};
