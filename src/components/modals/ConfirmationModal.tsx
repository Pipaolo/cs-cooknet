import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { type ReactNode } from "react";

interface Props extends UseDisclosureReturn {
  titleText?: string;
  title?: ReactNode;
  descriptionText: string;
  description?: ReactNode;
  isLoading?: boolean;

  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = (props: Props) => {
  const { descriptionText, description, title, titleText } = props;

  const renderTitle = () => {
    if (title) {
      return title;
    }

    return <Heading size={"md"}>{titleText}</Heading>;
  };

  const renderDescription = () => {
    if (description) {
      return description;
    }

    return <p>{descriptionText}</p>;
  };

  return (
    <Modal {...props} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{renderTitle()}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{renderDescription()}</ModalBody>
        <ModalFooter>
          <div className="flex space-x-2">
            <Button
              isDisabled={props.isLoading}
              onClick={props.onCancel}
              colorScheme="stone"
            >
              Cancel
            </Button>
            <Button
              onClick={props.onConfirm}
              isLoading={props.isLoading}
              colorScheme="green"
            >
              Confirm
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
