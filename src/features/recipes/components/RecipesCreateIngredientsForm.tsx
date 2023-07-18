import { type UseFormReturn, type UseFieldArrayReturn } from "react-hook-form";
import { type RecipeCreateSchema } from "../types";
import { Button, IconButton } from "@chakra-ui/react";
import { FormTextField } from "~/components/form";
import { FaTrash } from "react-icons/fa";

interface Props {
  form: UseFormReturn<RecipeCreateSchema>;
  fieldArray: UseFieldArrayReturn<RecipeCreateSchema, "ingredients", "id">;
}

export const RecipesCreateIngredientsForm = ({ fieldArray, form }: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <h3 className="text-xl font-bold">
          Ingredients ({fieldArray.fields.length})
        </h3>

        <Button
          size={"sm"}
          colorScheme="stone"
          onClick={() =>
            fieldArray.append({
              name: "",
              quantity: 0,
              unit: "",
            })
          }
        >
          Add Ingredient
        </Button>
      </div>
      {fieldArray.fields.map((field, index) => {
        return (
          <div className="flex items-start space-x-4" key={field.id}>
            <FormTextField
              register={form.register(`ingredients.${index}.name`)}
              placeholder="Enter the name of the ingredient"
              formControl={{
                labelText: "Name",
                errorMessage: form.formState.errors?.ingredients?.[index]?.name,
              }}
            />
            <FormTextField
              register={form.register(`ingredients.${index}.quantity`)}
              placeholder="Enter the name of the ingredient"
              type="number"
              formControl={{
                labelText: "Quantity",
                errorMessage:
                  form.formState.errors?.ingredients?.[index]?.quantity,
              }}
            />
            <IconButton
              icon={<FaTrash />}
              isDisabled={fieldArray.fields.length === 1}
              onClick={() => fieldArray.remove(index)}
              colorScheme={"red"}
              aria-label="Delete Ingredient"
            />
          </div>
        );
      })}
    </div>
  );
};
