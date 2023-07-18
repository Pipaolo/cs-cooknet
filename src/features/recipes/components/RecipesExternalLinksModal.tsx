import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { FaLink } from "react-icons/fa";
import { type Recipe } from "../types";

interface Props extends UseDisclosureReturn {
  recipe: Recipe;
}

export const RecipesExternalLinksModal = ({ recipe, ...props }: Props) => {
  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center space-x-4">
            <FaLink /> <span>External Links</span>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ul className="flex list-disc flex-col space-y-2 p-4">
            {recipe.videoLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  className="flex items-center space-x-2 underline"
                >
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
