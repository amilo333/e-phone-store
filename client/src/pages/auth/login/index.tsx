import { Button, FormInput } from "@/components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./style.module.scss";
import { NavLink } from "react-router";

export default function Login() {
  const { t } = useTranslation();
  const { control } = useForm();

  return (
    <div className={styles["login-container"]}>
      <h2>{t("login.title")}</h2>
      <div className={styles["login-form"]}>
        <FormInput control={control} name="username" label="Username" />
        <FormInput
          control={control}
          name="password"
          label="Password"
          textFieldType="password"
        />
        <div className={styles["sub-action-section"]}>
          <FormInput
            control={control}
            name="forgotPassword"
            type="checkbox"
            id="remember"
            label="Remember me"
          />
          <p className={styles['link']}>
            Have an account?
            <NavLink className="navlink" to="/auth/register">
              Register
            </NavLink>
          </p>
        </div>
        <Button variant="contained">Login</Button>
      </div>
    </div>
  );
}
