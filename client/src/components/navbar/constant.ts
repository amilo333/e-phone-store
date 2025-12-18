import {
  BarChartSquareUp,
  BezierCurve03,
  Cube01,
  File06,
  ShoppingBag01,
  ShoppingCart01,
  User02,
} from "@untitledui/icons";

export const langOption = [
  { label: "Việt Nam", value: "vi" },
  { label: "English", value: "en" },
];

export const publicMenuIcon = [
  {
    icon: ShoppingBag01,
    label: "Danh sách sản phẩm",
    to: "/",
  },
  {
    icon: ShoppingCart01,
    label: "Giỏ hàng",
    to: "/cart",
    hasCount: true,
  },
];

export const privateMenuIcon = [
  {
    icon: BezierCurve03,
    label: "Quản lý sản phẩm",
    to: "/product/management",
  },
  {
    icon: Cube01,
    label: "Quản lý đơn hàng",
    to: "/product/ordered",
  },
  {
    icon: File06,
    label: "Quản lý danh mục",
    to: "/category/management",
  },
];

export const adminMenuIcon = [
  {
    icon: BarChartSquareUp,
    label: "Thống kê doanh thu",
    to: "/revenue",
  },
  {
    icon: User02,
    label: "Quản lý tài khoản",
    to: "/user/management",
  },
];
