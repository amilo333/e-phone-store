import { Breadcrumbs, Link } from "@mui/material";
import { ChevronRight } from "@untitledui/icons";
import styles from "./style.module.scss";
import type { TBreadscrumbsProps } from "./type";

export default function Breadscrumbs(props: TBreadscrumbsProps) {
  const { items } = props;

  return (
    <div className={styles["breadscrumbs-container"]}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<ChevronRight width={18} height={18} />}
      >
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        {items.map((item, index) => (
          <Link
            underline="hover"
            color="inherit"
            href={item.href || "#"}
            key={index}
          >
            {item.label}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
