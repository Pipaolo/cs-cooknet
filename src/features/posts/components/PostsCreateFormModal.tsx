import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormReturn, useForm, Controller } from "react-hook-form";
import { PostsCreateSchema } from "../types";
import {
  FormControlWrapper,
  FormTextArea,
  FormTextField,
} from "~/components/form";
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
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import SelectCreatable from "react-select/creatable";
import { useState } from "react";
import { api } from "~/utils/api";
import { TRPCClientError } from "@trpc/client";

type Props = UseDisclosureReturn;

type PostsCreateTagsOption = {
  label: string;
  value: string;
};

const PostsCreateTagsSelect = ({
  form,
}: {
  form: UseFormReturn<PostsCreateSchema>;
}) => {
  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControlWrapper labelText="Tags" errorMessage={fieldState.error}>
            <SelectCreatable<PostsCreateTagsOption, true>
              isMulti
              options={[]}
              name={field.name}
              ref={field.ref}
              value={field.value?.map((value) => {
                return {
                  label: value.name,
                  value: value.name,
                } as PostsCreateTagsOption;
              })}
              classNames={{
                control: (_) =>
                  `${
                    _.isFocused
                      ? "shadow-none ring-1 ring-stone-500 border-stone-500"
                      : ""
                  }`,
                multiValue: (_) =>
                  "bg-stone-500 rounded-md text-white p-1 space-x-2",
                multiValueLabel: (_) => "text-white",
                multiValueRemove: (_) => "text-white rounded-md aspect-square",
              }}
              placeholder="Select tags for the post"
              onChange={(newValue) => {
                const values = newValue.map((value) => {
                  return {
                    name: value.value,
                  };
                });

                field.onChange(values);
              }}
              onBlur={field.onBlur}
            />
          </FormControlWrapper>
        );
      }}
    />
  );
};

export const PostsCreateFormModal = (props: Props) => {
  const form = useForm<PostsCreateSchema>({
    resolver: zodResolver(PostsCreateSchema),
  });

  const createOne = api.post.createOne.useMutation();
  const trpcUtils = api.useContext();
  const toast = useToast();

  const onSubmit = async (data: PostsCreateSchema) => {
    try {
      await createOne.mutateAsync(data);
      await trpcUtils.post.getAll.invalidate();

      toast({
        title: "Post created.",
        description: "Your post has been created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      form.reset();
      props.onClose();
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
      closeOnEsc={!createOne.isLoading}
      closeOnOverlayClick={!createOne.isLoading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size={"md"}>Create a post</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="p-0">
          <form
            onSubmit={(_) => void form.handleSubmit(onSubmit)(_)}
            className="flex flex-col space-y-4 p-4"
          >
            <FormTextField
              register={form.register("title")}
              className="w-full"
              placeholder="Enter the title of the recipe"
              formControl={{
                controlProps: {
                  className: "w-full",
                },
                labelText: "Title",
                errorMessage: form.formState.errors.title,
              }}
            />
            <FormTextArea
              placeholder="Enter the content of the recipe"
              register={form.register("content")}
              formControl={{
                labelText: "Content",
                errorMessage: form.formState.errors.content,
              }}
            />
            <PostsCreateTagsSelect form={form} />

            <Button
              type="submit"
              colorScheme="stone"
              isLoading={createOne.isLoading}
            >
              Create
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};