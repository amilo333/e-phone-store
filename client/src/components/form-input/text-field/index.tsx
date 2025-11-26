import MuiTextField from "@mui/material/TextField";
import styles from "./style.module.scss";
import type { TProps } from "./type";

/**
 * FormInput - Text field
 * @param props Component props
 * @returns Child component
 */
export default function TextField(props: TProps) {
  // [Props] Destructuring props
  const { label, error, textFieldType, slotProps, ...rest } = props;

  //! [JSX Section]
  return (
    <div className={styles["textfield-container"]}>
      <label className={`${styles["label"]} ${error && styles["error"]}`}>
        {label}
      </label>
      <MuiTextField
        {...rest}
        inputRef={props.ref}
        variant="outlined"
        type={textFieldType ?? "text"}
        label=""
        slotProps={{
          ...slotProps,
          root: { className: styles["textfield-root"] },
          input: { className: styles["textfield-input-wrapper"] },
          inputLabel: { className: styles["textfield-label"] },
          htmlInput: { className: styles["textfield-input"] },
          formHelperText: { className: styles["textfield-helper-text"] },
        }}
      />
      <small className={styles["error-text"]}>{error}</small>
    </div>
  );
}
