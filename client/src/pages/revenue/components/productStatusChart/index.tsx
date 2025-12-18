import {
  Cell,
  Legend,
  Pie,
  PieChart,
  type PieLabelRenderProps,
} from "recharts";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";

const RADIAN = Math.PI / 180;
const COLORS = ["--error-primary", "--warn-color", "--success-color"];

export default function ProductStatusChart(props: any) {
  const { itemCountByStatus } = props;

  const [pieData, setPieData] = useState([
    { name: "Đã đặt hàng", value: 0 },
    { name: "Đang chuẩn bị", value: 0 },
    { name: "Đã giao cho shipper", value: 0 },
  ]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelRenderProps) => {
    if (
      cx == null ||
      cy == null ||
      innerRadius == null ||
      outerRadius == null
    ) {
      return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > ncx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    if (itemCountByStatus) {
      setPieData([
        { name: "Đã đặt hàng", value: itemCountByStatus["Đã đặt hàng"] },
        { name: "Đang chuẩn bị", value: itemCountByStatus["Đang chuẩn bị"] },
        {
          name: "Đã giao cho shipper",
          value: itemCountByStatus["Đã giao cho shipper"],
        },
      ]);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCountByStatus]);

  return (
    <div className={styles["product-status-chart"]}>
      <p className={styles["title"]}>
        <img src="/svg/box-icon.svg" alt="" width={20} height={20} />
        Trạng thái đơn hàng
      </p>
      <PieChart
        style={{
          width: "100%",
          height: "100%",
          minWidth: "500px",
          maxHeight: "55vh",
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={pieData}
          dataKey="value"
          cx="50%"
          cy="50%"
          fill="#8884d8"
          isAnimationActive={true}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={`var(${COLORS[index % COLORS.length]})`}
            />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}
