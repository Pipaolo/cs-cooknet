import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  type FormControlProps,
  type FormLabelProps,
  type FormErrorMessageProps,
  type FormHelperTextProps,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { type FieldError } from "react-hook-form";

export interface FormControlWrapperProps {
  controlProps?: FormControlProps;
  labelProps?: FormLabelProps;
  labelText: string;
  children: React.ReactNode;
  errorMessage?: FieldError;
  errorMessageProps?: FormErrorMessageProps;
  helperText?: string;
  helperTextProps?: FormHelperTextProps;
}

export const FormControlWrapper = (props: FormControlWrapperProps) => {
  const isInvalid = useMemo(() => !!props.errorMessage, [props.errorMessage]);

  const renderErrorMessage = () => {
    if (!props.errorMessage) {
      return null;
    }

    return (
      <FormErrorMessage {...props.errorMessageProps}>
        {props.errorMessage?.message}
      </FormErrorMessage>
    );
  };

  const renderHelperText = () => {
    if (!props.helperText || props.errorMessage) {
      return null;
    }

    return (
      <FormHelperText {...props.helperTextProps}>
        {props.helperText}
      </FormHelperText>
    );
  };

  return (
    <FormControl {...props.controlProps} isInvalid={isInvalid}>
      <FormLabel {...props.labelProps}>{props.labelText}</FormLabel>
      {props.children}

      {renderErrorMessage()}
      {renderHelperText()}
    </FormControl>
  );
};
