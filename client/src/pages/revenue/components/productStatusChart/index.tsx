import {
  Cell,
  Legend,
  Pie,
  PieChart,
  type PieLabelRenderProps,
} from "recharts";
import styles from "./style.module.scss";

const pieData = [
  { name: "Đã đặt đơn", value: 400 },
  { name: "Đang chuẩn bị", value: 300 },
  { name: "Đã giao cho shipper", value: 300 },
];

const RADIAN = Math.PI / 180;
const COLORS = ["--error-primary", "--warn-color", "--success-color"];

export default function ProductStatusChart() {
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
