/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { type RecipePost } from "~/features/recipes/types";
import { DateTime } from "luxon";
import Image from "next/image";
import { HomeRecipeItemComments } from "./HomeRecipeItemComments";
import {
  FaBookmark,
  FaClipboard,
  FaEllipsisV,
  FaLink,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { RecipesAddToRecipeBookModal } from "~/features/recipes/components/RecipesAddToRecipeBookModal";
import {
  RecipesExternalLinksModal,
  RecipesIngredientsModal,
  RecipesProceduresModal,
} from "~/features/recipes";
import { type Post } from "~/features/posts";
import { useMemo } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { ConfirmationModal } from "~/components/modals";
import { TRPCClientError } from "@trpc/client";
import Link from "next/link";

interface Props {
  post: Post;
}

export const HomeRecipeItem = ({ post }: Props) => {
  const formattedDate = DateTime.fromJSDate(post.createdAt).toLocaleString(
    DateTime.DATE_FULL
  );
  const { user } = useUser();
  const toast = useToast();
  const recipe = post.recipe;
  const trpcUtils = api.useContext();
  const deleteOne = api.post.deleteOne.useMutation();

  const deleteDisclosure = useDisclosure();
  const addToRecipeBookDisclosure = useDisclosure();
  const externalLinksDisclosure = useDisclosure();
  const ingredientsDisclosure = useDisclosure();
  const proceduresDisclosure = useDisclosure();

  const isAuthor = useMemo(() => {
    if (!user) return false;
    return user.id === post.author.clerkId;
  }, [user, post.author.clerkId]);

  const onDeleteConfirmed = async () => {
    try {
      await deleteOne.mutateAsync({
        postId: post.id,
      });

      toast({
        title: "Success",
        description: "Post deleted successfully",
        status: "success",
        duration: 3000,
      });

      await trpcUtils.post.getAll.invalidate();
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 3000,
        });
      }
    }
  };

  const renderMenuItems = () => {
    return (
      <>
        <MenuItem
          onClick={ingredientsDisclosure.onOpen}
          icon={<GiFruitBowl className="text-stone-500" size={"1rem"} />}
        >
          Ingredients
        </MenuItem>
        <MenuItem
          onClick={proceduresDisclosure.onOpen}
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
        {isAuthor && (
          <MenuItem
            onClick={() => {
              deleteDisclosure.onOpen();
            }}
            icon={<FaTrash className="text-stone-500" size={"1rem"} />}
          >
            Delete
          </MenuItem>
        )}
      </>
    );
  };

  if (recipe === null) return <div></div>;

  return (
    <div className="grid grid-cols-12 gap-2">
      {/* Header */}
      <div className="col-span-12 flex items-start space-x-2 ">
        <img
          alt="profile"
          src={post.author.profileUrl}
          className="h-14 w-14 rounded-full "
        />
        <div className="flex flex-col">
          <Heading size={"md"}>{recipe.title}</Heading>
          <Link href={`/home/profile?user=${recipe.authorId}`}>
            <span className="stone-500 text-sm hover:underline focus:underline active:underline">
              {post.author.email}
            </span>
          </Link>
          <span className="stone-500 text-sm">{formattedDate}</span>
          <div className="mt-2 flex flex-wrap space-x-2">
            {post.tags.map((tag, i) => {
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
        <Spacer />
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
            <MenuList className="font-medium">{renderMenuItems()}</MenuList>
          </Menu>
        </div>
      </div>
      {/* Image */}
      <div className="relative  col-span-8 h-[400px] overflow-hidden">
        <Image
          fill
          className=" rounded-md object-cover"
          src={
            recipe?.image ??
            "https://plus.unsplash.com/premium_photo-1664360228046-a0a7ccf4fb38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          }
          alt="food"
        />
      </div>
      {/* Comments */}
      <HomeRecipeItemComments recipePost={post} />
      <RecipesAddToRecipeBookModal
        {...addToRecipeBookDisclosure}
        recipe={recipe}
      />
      <RecipesExternalLinksModal {...externalLinksDisclosure} recipe={recipe} />
      <RecipesIngredientsModal {...ingredientsDisclosure} recipe={recipe} />
      <RecipesProceduresModal {...proceduresDisclosure} recipe={recipe} />
      <ConfirmationModal
        {...deleteDisclosure}
        titleText="Delete Post?"
        descriptionText="You cannot undo this action."
        isLoading={deleteOne.isLoading}
        onConfirm={() => void onDeleteConfirmed()}
        onCancel={deleteDisclosure.onClose}
      />
    </div>
  );
};
