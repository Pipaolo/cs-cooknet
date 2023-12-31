import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { GiBasket } from "react-icons/gi";
import { type Recipe } from "../types";

interface Props extends UseDisclosureReturn {
  recipe: Recipe;
}

export const RecipesIngredientsModal = ({ recipe, ...props }: Props) => {
  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center space-x-4">
            <GiBasket /> <span>Ingredients</span>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ol className="flex list-decimal flex-col space-y-2 p-4">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                <span className="flex items-center">
                  {ingredient.quantity}x - {ingredient.name}
                </span>
              </li>
            ))}
          </ol>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
