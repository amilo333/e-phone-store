import MuiTooltip from "@mui/material/Tooltip";
import type { TTooltipProps } from "./type";

export default function Tooltip(props: TTooltipProps) {
  const { children, ...rest } = props;

  return <MuiTooltip {...rest}>{children}</MuiTooltip>;
}
