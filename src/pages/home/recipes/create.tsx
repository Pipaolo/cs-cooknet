import Head from "next/head";
import RecipesAppBar from "~/features/recipes/components/RecipesAppBar";
import { type SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeCreateSchema } from "~/features/recipes/types";
import { Button, IconButton, useToast } from "@chakra-ui/react";
import { FormTextArea, FormTextField } from "~/components/form";
import { FaTrash } from "react-icons/fa";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { TRPCClientError } from "@trpc/client";

const RecipesCreatePage = () => {
  const toast = useToast();
  const router = useRouter();
  const createOne = api.recipe.createOne.useMutation();

  const form = useForm<RecipeCreateSchema>({
    resolver: zodResolver(RecipeCreateSchema),
    defaultValues: {
      ingredients: [
        {
          value: "",
        },
      ],
      videoUrls: [
        {
          value: "",
        },
      ],
    },
  });

  const ingredientsFieldArray = useFieldArray({
    control: form.control,
    keyName: "id",
    name: "ingredients",
  });

  const videoUrlsFieldArray = useFieldArray({
    control: form.control,
    keyName: "id",
    name: "videoUrls",
  });

  const onSubmit: SubmitHandler<RecipeCreateSchema> = async (
    data: RecipeCreateSchema
  ) => {
    try {
      const response = await createOne.mutateAsync(data);

      toast({
        title: "Success",
        description: "Recipe created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await router.push("/home/recipes");
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
        <title>Create Recipe</title>
      </Head>
      <main className="flex h-full min-h-screen w-full flex-col">
        <RecipesAppBar />
        <div className="flex justify-center p-4">
          <div className="flex w-full max-w-lg flex-col items-start space-y-4">
            <h3 className="text-2xl font-bold">Create Recipes</h3>
            <form
              className="flex w-full flex-col space-y-4"
              onSubmit={(_) =>
                void form.handleSubmit(onSubmit, console.error)(_)
              }
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

              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-bold">
                    Ingredients ({ingredientsFieldArray.fields.length})
                  </h3>

                  <Button
                    size={"sm"}
                    colorScheme="stone"
                    onClick={() =>
                      ingredientsFieldArray.append({
                        value: "",
                      })
                    }
                  >
                    Add Ingredient
                  </Button>
                </div>
                {ingredientsFieldArray.fields.map((field, index) => {
                  return (
                    <div className="flex items-end space-x-4" key={field.id}>
                      <FormTextField
                        register={form.register(`ingredients.${index}.value`)}
                        placeholder="Enter the name of the ingredient"
                        formControl={{
                          labelText: "Name",

                          errorMessage:
                            form.formState.errors?.ingredients?.[index]?.value,
                        }}
                      />
                      <IconButton
                        icon={<FaTrash />}
                        isDisabled={ingredientsFieldArray.fields.length === 1}
                        onClick={() => ingredientsFieldArray.remove(index)}
                        colorScheme={"red"}
                        aria-label="Delete Ingredient"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-bold">
                    Video Urls ({videoUrlsFieldArray.fields.length})
                  </h3>

                  <Button
                    size={"sm"}
                    colorScheme="stone"
                    onClick={() =>
                      videoUrlsFieldArray.append({
                        value: "",
                      })
                    }
                  >
                    Add Video URL
                  </Button>
                </div>
                {videoUrlsFieldArray.fields.map((field, index) => {
                  return (
                    <div className="flex items-end space-x-4" key={field.id}>
                      <FormTextField
                        register={form.register(`videoUrls.${index}.value`)}
                        placeholder="Enter video url"
                        formControl={{
                          labelText: "URL",
                          errorMessage:
                            form.formState.errors?.videoUrls?.[index]?.value,
                        }}
                      />
                      <IconButton
                        icon={<FaTrash />}
                        isDisabled={videoUrlsFieldArray.fields.length === 1}
                        onClick={() => videoUrlsFieldArray.remove(index)}
                        colorScheme={"red"}
                        aria-label="Delete Video Url"
                      />
                    </div>
                  );
                })}
              </div>

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

export default RecipesCreatePage;
