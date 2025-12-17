import type { AutocompleteProps } from "@mui/material/Autocomplete";
import type { FieldPath, FieldValues } from "react-hook-form";
import type { TFieldState } from "../field/type";

// [Type] Component props
export type TProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = TFieldState<TFieldValues, TName> &
  Omit<
    AutocompleteProps<TSelectOption, false, boolean, false>,
    "options" | "renderInput"
  > & {
    options: TSelectOption[];
    label?: string;
    required?: boolean;
    width?: string;
  };

export type TSelectOption = {
  label: string;
  value: string;
};
