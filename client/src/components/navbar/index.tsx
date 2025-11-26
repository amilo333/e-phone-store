import {
  Flash,
  Menu01,
  SearchMd,
  ShoppingCart01,
  User02,
} from "@untitledui/icons";
import { Link } from "react-router";
import Select from "../form-input/select";
import { langOption } from "./constant";
import styles from "./style.module.scss";
import { useForm } from "react-hook-form";
import FormInput from "../form-input";
import InputAdornment from "@mui/material/InputAdornment";

export default function Navbar() {
  const { control } = useForm({});

  //! JSX Section
  return (
    <div className={styles["navbar-container"]}>
      <div className={styles["left-side"]}>
        <Flash className={styles["icon"]} />
        <FormInput
          control={control}
          name="search"
          placeholder="Search for product"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchMd />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>
      <div className={styles["right-side"]}>
        <ShoppingCart01 />
        <User02 />
        <Link className="navlink" to="#">
          Login
        </Link>
        <Select
          disableClearable
          defaultValue={langOption[1]}
          options={langOption}
          width="130px"
        />
        <Menu01 />
      </div>
    </div>
  );
}
