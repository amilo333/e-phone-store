import { usePageStore } from "@/stores";
import { useEffect } from "react";
import { ProductStatusChart, TopProductChart } from "./components";
import styles from "./style.module.scss";

export default function Revenue() {
  const { setPageName } = usePageStore();

  const revenueStat = [
    {
      name: "Tổng doanh thu",
      value: 200000000,
      unit: "đ",
    },
    {
      name: "Tổng số đơn hàng",
      value: 18,
      unit: "đơn",
    },
  ];

  useEffect(() => {
    setPageName("Thống kê doanh thu");
  }, []);

  return (
    <div className={styles["revenue-container"]}>
      <div className={styles["statistic"]}>
        {revenueStat.map((item) => (
          <div className={styles["single-stat"]} key={item.name}>
            <p className={styles["stat-title"]}>{item.name}</p>
            <p className={styles["stat-value"]}>
              {item.value.toLocaleString()} {item.unit}
            </p>
          </div>
        ))}
      </div>

      <div className={styles["chart-section"]}>
        <TopProductChart />
        <ProductStatusChart />
      </div>
    </div>
  );
}
