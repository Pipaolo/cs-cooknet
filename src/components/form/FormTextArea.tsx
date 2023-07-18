import { type UseFormRegisterReturn } from "react-hook-form";
import {
  FormControlWrapper,
  type FormControlWrapperProps,
} from "./FormControlWrapper";
import { Textarea, type TextareaProps } from "@chakra-ui/react";

interface Props extends TextareaProps {
  formControl: Omit<FormControlWrapperProps, "children">;
  register: UseFormRegisterReturn;
}

export const FormTextArea = ({ register, formControl, ...props }: Props) => {
  return (
    <FormControlWrapper {...formControl}>
      <Textarea {...props} {...register} />
    </FormControlWrapper>
  );
};
