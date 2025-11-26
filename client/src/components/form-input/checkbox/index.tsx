import MuiCheckbox from "@mui/material/Checkbox";
import styles from "./style.module.scss";
import type { TProps } from "./type";

export default function Checkbox(props: TProps) {
  // [Props] Destructuring props
  const { id, label, ...rest } = props;

  //! JSX Section
  return (
    <div className={styles["checkbox-container"]}>
      <MuiCheckbox id={id} className={styles["checkbox"]} {...rest} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
