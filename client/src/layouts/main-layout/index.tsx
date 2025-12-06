import { Navbar } from "@/components";
import { Outlet } from "react-router";
import styles from "./style.module.scss";

export default function MainLayout() {
  return (
    <div className={styles["main-layout-container"]}>
      <Navbar />
      <div className={styles["outlet-section"]}>
        <Outlet />
      </div>
    </div>
  );
}
