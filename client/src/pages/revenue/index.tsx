import { usePageStore } from "@/stores";
import { useEffect, useState } from "react";
import { ProductStatusChart, TopProductChart } from "./components";
import styles from "./style.module.scss";
import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services";

export default function Revenue() {
  const { setPageName } = usePageStore();

  const [revenueStat, setRevenueStat] = useState([
    {
      name: "Tổng doanh thu",
      value: 0,
      unit: "đ",
    },
    {
      name: "Tổng số đơn hàng",
      value: 0,
      unit: "đơn",
    },
  ]);
  const [itemCountByStatus, setItemCountByStatus] = useState(null);

  const { data: orderList } = useQuery({
    queryKey: ["ordered-products"],
    queryFn: async () => {
      const response = await apiService("/get-orders");
      return response.data.data;
    },
  });

  useEffect(() => {
    const totalMoney = orderList
      ?.filter((order: any) => order.status === "Đã giao cho shipper")
      ?.reduce((orderSum: number, order: any) => {
        const itemsTotal = order.items.reduce((itemSum: number, item: any) => {
          return itemSum + Number(item.model.price);
        }, 0);
        return orderSum + itemsTotal;
      }, 0);

    const totalItemCount = orderList?.reduce(
      (sum: number, order: any) => sum + order.items.length,
      0
    );

    const itemsByStatus = orderList?.reduce((acc: any, order: any) => {
      const status = order.status;

      if (!acc[status]) {
        acc[status] = 0;
      }

      acc[status] += order.items.length;
      return acc;
    }, {} as Record<string, number>);

    setItemCountByStatus(itemsByStatus);

    setRevenueStat([
      {
        name: "Tổng doanh thu",
        value: totalMoney,
        unit: "đ",
      },
      {
        name: "Tổng số đơn hàng",
        value: totalItemCount,
        unit: "đơn",
      },
    ]);
  }, [orderList]);

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
              {item.value?.toLocaleString() ?? 0} {item.unit}
            </p>
          </div>
        ))}
      </div>

      <div className={styles["chart-section"]}>
        <TopProductChart />
        <ProductStatusChart itemCountByStatus={itemCountByStatus} />
      </div>
    </div>
  );
}
