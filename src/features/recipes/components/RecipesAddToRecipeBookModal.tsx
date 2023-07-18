import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  type UseDisclosureReturn,
  Select,
  Button,
} from "@chakra-ui/react";
import { api } from "~/utils/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { type Recipe } from "../types";

interface Props extends UseDisclosureReturn {
  recipe: Recipe;
}

export const RecipesAddToRecipeBookModal = ({ recipe, ...props }: Props) => {
  const addRemoveFromRecipeBook =
    api.recipeBook.addRemoveRecipeFromRecipeBook.useMutation();

  const trpcUtils = api.useContext();

  const recipeBooks = api.recipeBook.getAllForForm.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: props.isOpen,
  });

  const [selectedRecipeBookId, setSelectedRecipeBookId] = useState<string>("");

  const checkIfInRecipeBook = useCallback((recipeBookId: string) => {
    return false;
    // const currentRecipeBooks = recipe.recipeBooks.map((recipeBook) => {
    //   return recipeBook.id;
    // });

    // return currentRecipeBooks.includes(recipeBookId);
  }, []);

  const toast = useToast();
  const options = useMemo(() => {
    return (
      recipeBooks.data?.map((recipeBook) => ({
        existing: false,
        label: recipeBook.title,
        value: recipeBook.id,
      })) ?? []
    );
  }, [recipeBooks.data, checkIfInRecipeBook]);

  useEffect(() => {
    if (props.isOpen) {
      return;
    }

    setSelectedRecipeBookId("");
  }, [props.isOpen]);

  const onAddRemoveFromRecipeBook = async () => {
    try {
      const isInSelectedRecipeBook = checkIfInRecipeBook(selectedRecipeBookId);
      await addRemoveFromRecipeBook.mutateAsync({
        type: isInSelectedRecipeBook ? "remove" : "add",
        recipeBookId: selectedRecipeBookId,
        recipeId: recipe.id,
      });

      toast({
        title: "Success",
        description: isInSelectedRecipeBook
          ? "Removed from recipe book"
          : "Added to recipe book",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await trpcUtils.recipe.getAll.invalidate();
      props.onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: String(error),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add to Recipe Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-col space-y-4 p-4">
            <Select
              value={selectedRecipeBookId}
              onChange={(e) => setSelectedRecipeBookId(e.target.value)}
              isDisabled={recipeBooks.isLoading}
            >
              <option value={""}>Select Recipe Book</option>
              {options.map((data) => (
                <option
                  key={data.value}
                  value={data.value}
                  className={data.existing ? "text-gray-400" : ""}
                >
                  {data.label} {data.existing ? "(Already Added)" : ""}
                </option>
              ))}
            </Select>
            <Button
              colorScheme="stone"
              isDisabled={selectedRecipeBookId === ""}
              isLoading={addRemoveFromRecipeBook.isLoading}
              onClick={() => void onAddRemoveFromRecipeBook()}
            >
              {checkIfInRecipeBook(selectedRecipeBookId) ? "Remove" : "Add"}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
