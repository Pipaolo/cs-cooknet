import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  type UseDisclosureProps,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { useForm } from "react-hook-form";
import { FormTextField } from "~/components/form";
import { PostsAddCommentSchema } from "~/features/posts/types";
import { type RecipePost } from "~/features/recipes/types";
import { api } from "~/utils/api";

interface Props extends UseDisclosureReturn {
  recipePost: RecipePost;
}

export const HomeRecipeItemCommentsModal = ({
  recipePost,
  ...props
}: Props) => {
  const addComment = api.post.addCommentToPost.useMutation();
  const trpcUtils = api.useContext();
  const toast = useToast();

  const form = useForm<PostsAddCommentSchema>({
    values: {
      content: "",
      postId: recipePost.id,
    },
    resolver: zodResolver(PostsAddCommentSchema),
  });

  const onSubmit = async (values: PostsAddCommentSchema) => {
    try {
      await addComment.mutateAsync(values);

      form.reset();
      props.onClose();
      toast({
        title: "Comment Added",
        status: "success",
      });

      await trpcUtils.post.getOnePostComments.invalidate({
        postId: recipePost.id,
      });
    } catch (error) {
      if (error instanceof TRPCClientError) {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Modal
      {...props}
      isCentered
      closeOnEsc={!addComment.isLoading}
      closeOnOverlayClick={!addComment.isLoading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size={"md"}>Add Comment</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="p-0">
          <form
            onSubmit={(_) => void form.handleSubmit(onSubmit, console.error)(_)}
            className="flex flex-col space-y-4 p-4"
          >
            <FormTextField
              register={form.register("content")}
              className="w-full"
              placeholder="Enter comment"
              formControl={{
                controlProps: {
                  className: "w-full",
                },
                labelText: "Content",
                errorMessage: form.formState.errors.content,
              }}
            />

            <Button
              type="submit"
              colorScheme="stone"
              isLoading={addComment.isLoading}
            >
              Post
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
