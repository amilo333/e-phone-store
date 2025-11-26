import { Outlet } from "react-router";
import styles from "./style.module.scss";
import { Navbar } from "@/components";

export default function AuthLayout() {
  return (
    <div className={styles["auth-layout-container"]}>
      <Navbar />
      <div className={styles["outlet-section"]}>
        <Outlet />
      </div>
    </div>
  );
}
