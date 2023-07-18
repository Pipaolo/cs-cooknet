import { type UseFormRegisterReturn } from "react-hook-form";
import {
  FormControlWrapper,
  type FormControlWrapperProps,
} from "./FormControlWrapper";
import { Input, type InputProps } from "@chakra-ui/react";

interface Props extends InputProps {
  formControl: Omit<FormControlWrapperProps, "children">;
  register: UseFormRegisterReturn;
}

export const FormTextField = ({ register, formControl, ...props }: Props) => {
  return (
    <FormControlWrapper {...formControl}>
      <Input {...props} {...register} />
    </FormControlWrapper>
  );
};
