import MuiButton from "@mui/material/Button";
import type { TProps } from "./type";

export default function Button(props: TProps) {
  const { children, ...rest } = props;

  return <MuiButton {...rest}>{children}</MuiButton>;
}
