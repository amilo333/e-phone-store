import MuiButton from "@mui/material/Button";
import type { TProps } from "./type";

export default function Button(props: TProps) {
  const { children, variant = "contained", ...rest } = props;

  return (
    <MuiButton variant={variant} {...rest}>
      {children}
    </MuiButton>
  );
}
