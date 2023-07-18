import { type UseFormReturn, type UseFieldArrayReturn } from "react-hook-form";
import { type RecipeCreateSchema } from "../types";
import { Button, IconButton } from "@chakra-ui/react";
import { FormTextField } from "~/components/form";
import { FaTrash } from "react-icons/fa";

interface Props {
  form: UseFormReturn<RecipeCreateSchema>;
  fieldArray: UseFieldArrayReturn<RecipeCreateSchema, "procedures", "id">;
}

export const RecipesCreateProceduresForm = ({ fieldArray, form }: Props) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <h3 className="text-xl font-bold">
          Procedures ({fieldArray.fields.length})
        </h3>

        <Button
          size={"sm"}
          colorScheme="stone"
          onClick={() =>
            fieldArray.append({
              value: "",
            })
          }
        >
          Add Procedure
        </Button>
      </div>
      {fieldArray.fields.map((field, index) => {
        return (
          <div className="flex items-start space-x-4" key={field.id}>
            <FormTextField
              register={form.register(`procedures.${index}.value`)}
              placeholder="Enter the procedure"
              formControl={{
                labelText: "Procedure",
                errorMessage: form.formState.errors?.procedures?.[index]?.value,
              }}
            />

            <IconButton
              icon={<FaTrash />}
              isDisabled={fieldArray.fields.length === 1}
              onClick={() => fieldArray.remove(index)}
              colorScheme={"red"}
              aria-label="Delete Procedure"
            />
          </div>
        );
      })}
    </div>
  );
};
