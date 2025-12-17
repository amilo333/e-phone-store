import Label from "@/components/label";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { ChevronDown, XClose } from "@untitledui/icons";
import styles from "./style.module.scss";
import type { TProps } from "./type";

export default function Select(props: TProps) {
  // [Props] Destructuring props
  const {
    options = [],
    label,
    required,
    width = "100px",
    field,
    ...rest
  } = props;

  //! JSX Section
  return (
    <div className={styles["select-container"]}>
      {label && <Label required={required}>{label}</Label>}
      <Autocomplete
        {...rest}
        style={{ width }}
        options={options}
        onChange={(_, data) => field?.onChange(data)}
        popupIcon={<ChevronDown style={{ width: "16px", height: "16px" }} />}
        clearIcon={<XClose style={{ width: "16px", height: "16px" }} />}
        getOptionLabel={(option) => option.label ?? option}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
}
