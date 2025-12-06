import { Button, Field, TextField } from "@/components";
import { useToast } from "@/hooks";
import userMock from "@/mocks/user.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router";
import { loginSchema } from "./schama";
import styles from "./style.module.scss";
import type { TLoginForm } from "./type";

export default function Login() {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (data: TLoginForm) => {
    const user = userMock.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );
    if (!user) {
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
      return;
    } else {
      localStorage.setItem('isAuthenticated', 'true');
      toast.success("Đăng nhập thành công!");
      navigate("/");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <p className={styles["title"]}>{t("login.title")}</p>
      <div className={styles["login-form"]}>
        <Field control={control} name="username" label="Tên đăng nhập">
          <TextField error={errors?.username?.message} />
        </Field>
        <Field control={control} name="password" label="Mật khẩu">
          <TextField type="password" error={errors?.password?.message} />
        </Field>
        <div className={styles["sub-action-section"]}>
          <p className={styles["link"]}>
            Bạn đã có tài khoản?
            <NavLink className="navlink" to="/auth/register">
              Đăng ký
            </NavLink>
          </p>
        </div>
        <Button variant="contained" onClick={handleSubmit(handleLogin)}>
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}
