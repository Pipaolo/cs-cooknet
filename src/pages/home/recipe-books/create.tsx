import Head from "next/head";
import RecipesAppBar from "~/features/recipes/components/RecipesAppBar";
import { type SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, IconButton, useToast } from "@chakra-ui/react";
import { FormTextArea, FormTextField } from "~/components/form";
import { FaTrash } from "react-icons/fa";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { TRPCClientError } from "@trpc/client";
import { RecipeBookCreateSchema } from "~/features/recipeBooks/types";

const RecipeBookCreatePage = () => {
  const toast = useToast();
  const router = useRouter();
  const createOne = api.recipeBook.createOne.useMutation();

  const form = useForm<RecipeBookCreateSchema>({
    resolver: zodResolver(RecipeBookCreateSchema),
  });

  const onSubmit: SubmitHandler<RecipeBookCreateSchema> = async (
    data: RecipeBookCreateSchema
  ) => {
    try {
      await createOne.mutateAsync(data);
      toast({
        title: "Success",
        description: "Recipe Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await router.push("/home/recipe-books");
    } catch (error) {
      let message = "";
      if (error instanceof TRPCClientError) {
        message = error.message;
        return;
      }

      message = String(error);
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Create Recipe Book</title>
      </Head>
      <main className="flex h-full min-h-screen w-full flex-col">
        <RecipesAppBar />
        <div className="flex justify-center p-4">
          <div className="flex w-full max-w-lg flex-col items-start space-y-4">
            <h3 className="text-2xl font-bold">Create Recipe Book</h3>
            <form
              className="flex w-full flex-col space-y-4"
              onSubmit={(_) =>
                void form.handleSubmit(onSubmit, console.error)(_)
              }
            >
              <FormTextField
                register={form.register("title")}
                className="w-full"
                placeholder="Enter the title of the recipe book"
                formControl={{
                  controlProps: {
                    className: "w-full",
                  },
                  labelText: "Title",
                  errorMessage: form.formState.errors.title,
                }}
              />

              <Button
                type="submit"
                colorScheme="green"
                isLoading={createOne.isLoading}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default RecipeBookCreatePage;
