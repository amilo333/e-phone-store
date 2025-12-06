import { Button, Field, TextField } from "@/components";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Flash,
  Menu01,
  SearchMd,
  ShoppingBag01,
  ShoppingCart01,
  User02,
} from "@untitledui/icons";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styles from "./style.module.scss";

export default function Navbar() {
  const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));

  const navigate = useNavigate();

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleAuthen = () => {
    if (isAuthenticated) {
      localStorage.removeItem("isAuthenticated");
      navigate("/auth/login");
    } else {
      navigate("/auth/login");
    }
  };

  //! JSX Section
  return (
    <div
      className={clsx(styles["navbar-container"], {
        [styles["padding"]]: isAuthenticated,
      })}
    >
      <div
        className={clsx(styles["navbar-wrapper"], {
          [styles["navbar-authenticated"]]: isAuthenticated,
        })}
      >
        <div className={styles["left-side"]}>
          <Flash className={styles["icon"]} />
          {isAuthenticated ? (
            <h3>Cart</h3>
          ) : (
            <Field control={control} name="search">
              <TextField
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
            </Field>
          )}
        </div>
        <div className={styles["right-side"]}>
          <div className={styles["page-icon-group"]}>
            <ShoppingBag01 onClick={() => navigate("/")} />
            {isAuthenticated && (
              <>
                <ShoppingCart01 onClick={() => navigate("/cart")} />
                <User02 onClick={() => {}} />
              </>
            )}
          </div>
          <Button
            color={isAuthenticated ? "error" : "primary"}
            onClick={handleAuthen}
          >
            {isAuthenticated ? "logout" : "login"}
          </Button>
          <Menu01 />
        </div>
      </div>
    </div>
  );
}
