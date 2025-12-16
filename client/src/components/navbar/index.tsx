import { Button, MenuIcon } from "@/components";
import { usePageStore } from "@/stores";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { privateMenuIcon, publicMenuIcon } from "./constant";
import styles from "./style.module.scss";

export default function Navbar() {
  const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));
  const currentUser = JSON.parse(localStorage.getItem("user") ?? "{}");

  const { pageName } = usePageStore();
  const navigate = useNavigate();

  const handleAuthen = () => {
    if (isAuthenticated) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
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
          <>
            <h3
              className={clsx(styles["role"], {
                [styles["admin"]]: currentUser?.role?.code === 1,
                [styles["vendor"]]: currentUser?.role?.code === 2,
              })}
            >
              {currentUser?.role?.label ?? "Thoả sức mua sắm"}{" "}
              {isAuthenticated && "|"} {currentUser?.name}
            </h3>
            <h3>{pageName}</h3>
          </>
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
