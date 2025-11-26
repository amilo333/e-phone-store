import type { TextFieldProps } from "@mui/material/TextField";

/**
 * [Type] TextField component props
 */
export type TProps = TextFieldProps & {
  textFieldType?: "text" | "password";
};
