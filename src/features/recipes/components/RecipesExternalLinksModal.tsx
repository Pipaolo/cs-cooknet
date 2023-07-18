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
    <Modal {...props}>
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
            {/* {recipe.videoUrls.map((link, index) => (
              <li key={index}>
                <a
                  href={link}
                  target="_blank"
                  className="flex items-center space-x-2 underline"
                >
                  <span>{link}</span>
                </a>
              </li>
            ))} */}
          </ul>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
