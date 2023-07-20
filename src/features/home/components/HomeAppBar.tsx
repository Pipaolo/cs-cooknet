import { Button, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { AppBar } from "~/components/layout";
import { PostsCreateFormModal } from "~/features/posts";

export const HomeAppBar = () => {
  const router = useRouter();
  const createPostDisclosure = useDisclosure();

  return (
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
      <PostsCreateFormModal {...createPostDisclosure} />
    </AppBar>
  );
};
