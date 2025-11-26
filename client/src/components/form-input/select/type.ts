import type { AutocompleteProps } from "@mui/material/Autocomplete";

// [Type] Component props
export type TProps = Omit<
  AutocompleteProps<TSelectOption, false, boolean, false>,
  "options" | "renderInput"
> & {
  options: TSelectOption[];
  label?: string;
  width?: string;
};

export type TSelectOption = {
  label: string;
  value: string;
};
