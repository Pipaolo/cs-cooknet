import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import { type Recipe } from "../types";

interface Props extends UseDisclosureReturn {
  recipe: Recipe;
}

export const RecipesProceduresModal = ({ recipe, ...props }: Props) => {
  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center space-x-4">
            <FaClipboard /> <span>Procedures</span>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ol className="flex list-decimal flex-col space-y-2 p-4">
            {recipe.procedures.map((procedure, index) => (
              <li key={index}>
                <span>{procedure}</span>
              </li>
            ))}
          </ol>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
