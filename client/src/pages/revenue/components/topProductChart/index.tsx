import styles from "./style.module.scss";
import {
  BarChart,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";

export default function TopProductChart() {
  const data = [
    {
      name: "Iphone 12",
      product: 2400,
    },
    {
      name: "Iphone 13",
      product: 1398,
    },
    {
      name: "Iphone 14",
      product: 9800,
    },
    {
      name: "Iphone 15",
      product: 3908,
    },
    {
      name: "Iphone 16",
      product: 4800,
    },
  ];

  return (
    <div className={styles["top-product-chart"]}>
      <p className={styles["title"]}>
        <img src="/svg/flame-icon.svg" alt="" width={20} height={20} />
        Top 5 sản phẩm bán chạy
      </p>
      <BarChart
        style={{
          width: "100%",
          height: "55vh",
          maxHeight: "55vh",
        }}
        responsive
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="product"
          name="Sản phẩm"
          fill="var(--primary-color)"
          isAnimationActive={true}
        />
      </BarChart>
    </div>
  );
}
