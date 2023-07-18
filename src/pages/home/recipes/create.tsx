import Head from "next/head";
import RecipesAppBar from "~/features/recipes/components/RecipesAppBar";
import {
  type SubmitHandler,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeCreateSchema } from "~/features/recipes/types";
import { Button, IconButton, useToast } from "@chakra-ui/react";
import {
  FormControlWrapper,
  FormTextArea,
  FormTextField,
} from "~/components/form";
import { FaTrash } from "react-icons/fa";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { TRPCClientError } from "@trpc/client";
import { RecipesCreateIngredientsForm } from "~/features/recipes/components/RecipesCreateIngredientsForm";
import { RecipesCreateVideoUrlsForm } from "~/features/recipes/components/RecipesCreateVideoUrlsForm";
import SelectCreatable from "react-select/creatable";
import { RecipesCreateProceduresForm } from "~/features/recipes/components/RecipesCreateProceduresForm";

const RecipesCreatePage = () => {
  const toast = useToast();
  const router = useRouter();
  const createOne = api.recipe.createOne.useMutation();

  const form = useForm<RecipeCreateSchema>({
    resolver: zodResolver(RecipeCreateSchema),
    defaultValues: {
      procedures: [
        {
          value: "",
        },
      ],
      ingredients: [
        {
          name: "",
          quantity: 0,
          unit: "",
        },
      ],
    },
  });

  const proceduresFieldArray = useFieldArray({
    control: form.control,
    keyName: "id",
    name: "procedures",
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
      await createOne.mutateAsync(data);

      toast({
        title: "Success",
        description: "Recipe created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await router.push("/home");
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
              <Controller
                name="tags"
                control={form.control}
                render={({ field, fieldState }) => {
                  return (
                    <FormControlWrapper
                      labelText="Tags"
                      errorMessage={fieldState.error}
                    >
                      <SelectCreatable<{ value: string; label: string }, true>
                        isMulti
                        options={[]}
                        name={field.name}
                        ref={field.ref}
                        value={field.value?.map((value) => {
                          return {
                            label: value.value,
                            value: value.value,
                          };
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
                          multiValueRemove: (_) =>
                            "text-white rounded-md aspect-square",
                        }}
                        placeholder="Enter tags for the recipe"
                        onChange={(newValues) => {
                          const values = newValues.map((newValue) => {
                            return {
                              value: newValue.value,
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
              <RecipesCreateProceduresForm
                form={form}
                fieldArray={proceduresFieldArray}
              />
              <RecipesCreateIngredientsForm
                form={form}
                fieldArray={ingredientsFieldArray}
              />
              <RecipesCreateVideoUrlsForm
                form={form}
                fieldArray={videoUrlsFieldArray}
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

export default RecipesCreatePage;
