import { ShoppingBag01, ShoppingCart01, User02 } from "@untitledui/icons";

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
    label: "Quản lý giỏ hàng",
    to: "/cart",
  },
];

export const privateMenuIcon = [
  {
    icon: User02,
    label: "Quản lý tài khoản",
    to: "#",
  },
];
