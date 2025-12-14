import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
} from "@mui/material";
import Button from "../button";
import styles from "./style.module.scss";
import type { TDialogProps } from "./type";

export default function Dialog(props: TDialogProps) {
  const {
    title,
    children,
    width,
    minWidth,
    hideAction = false,
    onClose,
    onConfirm,
    ...rest
  } = props;

  return (
    <MuiDialog
      className={styles["dialog-container"]}
      sx={{
        ".MuiPaper-root": {
          minWidth: minWidth ?? "300px",
        },
      }}
      {...rest}
    >
      {title && (
        <DialogTitle id="alert-dialog-title" sx={{ width, minWidth }}>
          <p className={styles["dialog-title"]}>{title}</p>
        </DialogTitle>
      )}
      <DialogContent sx={{ width, minWidth }}>{children}</DialogContent>
      {!hideAction && (
        <DialogActions>
          <Button color="error" onClick={(e) => onClose?.(e, 'backdropClick')}>
            Huỷ
          </Button>
          <Button autoFocus onClick={onConfirm}>Đồng ý</Button>
        </DialogActions>
      )}
    </MuiDialog>
  );
}
