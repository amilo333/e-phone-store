import { useRoute } from "@/hooks";
import clsx from "clsx";
import { useNavigate } from "react-router";
import styles from "./style.module.scss";
import type { TMenuIconProps } from "./type";

export default function MenuIcon(props: TMenuIconProps) {
  const { icon: Icon, label, to } = props;

  const navigate = useNavigate();
  const route = useRoute();

  /**
   * Redirect Router
   */
  const redirectRouter = () => {
    navigate(to);
  };

  return (
    <div
      className={clsx(styles["menu-item-container"], {
        [styles["active"]]: route.pathname === to,
      })}
      onClick={redirectRouter}
    >
      <Icon />
      <span className={styles["menu-label"]}>{label}</span>
    </div>
  );
}
