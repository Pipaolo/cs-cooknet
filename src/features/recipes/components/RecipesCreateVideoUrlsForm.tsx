import { type UseFormReturn, type UseFieldArrayReturn } from "react-hook-form";
import { type RecipeCreateSchema } from "../types";
import { Button, IconButton } from "@chakra-ui/react";
import { FormTextField } from "~/components/form";
import { FaTrash } from "react-icons/fa";

interface Props {
  form: UseFormReturn<RecipeCreateSchema>;
  fieldArray: UseFieldArrayReturn<RecipeCreateSchema, "videoUrls", "id">;
}

export const RecipesCreateVideoUrlsForm = ({ fieldArray, form }: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <h3 className="text-xl font-bold">
          Video Urls ({fieldArray.fields.length})
        </h3>

        <Button
          size={"sm"}
          colorScheme="stone"
          onClick={() =>
            fieldArray.append({
              label: "",
              url: "",
            })
          }
        >
          Add Video URL
        </Button>
      </div>
      {fieldArray.fields.map((field, index) => {
        return (
          <div className="flex items-start space-x-4" key={field.id}>
            <FormTextField
              register={form.register(`videoUrls.${index}.label`)}
              placeholder="Enter url label"
              formControl={{
                labelText: "Label",
                errorMessage: form.formState.errors?.videoUrls?.[index]?.label,
              }}
            />
            <FormTextField
              register={form.register(`videoUrls.${index}.url`)}
              placeholder="Enter video url"
              formControl={{
                labelText: "URL",
                errorMessage: form.formState.errors?.videoUrls?.[index]?.url,
              }}
            />
            <IconButton
              icon={<FaTrash />}
              isDisabled={fieldArray.fields.length === 1}
              onClick={() => fieldArray.remove(index)}
              colorScheme={"red"}
              aria-label="Delete Video Url"
            />
          </div>
        );
      })}
    </div>
  );
};
