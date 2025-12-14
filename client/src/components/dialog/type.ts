import type { DialogProps } from "@mui/material";

export type TDialogProps = DialogProps & {
  width?: string | number;
  minWidth?: string | number;
  hideAction?: boolean;
  onConfirm?: () => void;
  children: React.ReactElement | React.ReactNode;
};
