import { Button, Field, MenuIcon, TextField } from "@/components";
import { usePageStore } from "@/stores";
import InputAdornment from "@mui/material/InputAdornment";
import { SearchMd } from "@untitledui/icons";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { privateMenuIcon, publicMenuIcon } from "./constant";
import styles from "./style.module.scss";

export default function Navbar() {
  const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));

  const { pageName } = usePageStore();
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
      <div className={styles["navbar-wrapper"]}>
        <div className={styles["left-side"]}>
          <span className={styles["logo"]}>EPS</span>
          {isAuthenticated ? (
            <h3>{pageName}</h3>
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
            {publicMenuIcon.map((item) => (
              <MenuIcon
                icon={item.icon}
                label={item.label}
                to={item.to}
                key={item.to}
              />
            ))}
            {isAuthenticated && (
              <>
                {privateMenuIcon.map((item) => (
                  <MenuIcon
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    key={item.to}
                  />
                ))}
              </>
            )}
          </div>
          <Button
            color={isAuthenticated ? "error" : "primary"}
            onClick={handleAuthen}
            variant="outlined"
          >
            {isAuthenticated ? "Đăng xuất" : "Đăng nhập"}
          </Button>
        </div>
      </div>
    </div>
  );
}
