import MainLayout from "@/layouts/main-layout";
import Cart from "@/pages/cart";
import CategoryManament from "@/pages/category";
import ProductDetail from "@/pages/product/detail";
import ProducList from "@/pages/product/list";
import ProductManagement from "@/pages/product/management";
import ProductOrdered from "@/pages/product/ordered";
import Revenue from "@/pages/revenue";
import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/auth-layout";
import Login from "../pages/auth/login";

export const router = createBrowserRouter([
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "",
        Component: ProducList,
      },
      {
        path: "/product/:id",
        Component: ProductDetail,
      },
      {
        path: "/product/management",
        Component: ProductManagement,
      },
      {
        path: "/product/ordered",
        Component: ProductOrdered,
      },
      {
        path: "/category/management",
        Component: CategoryManament,
      },
      {
        path: "/revenue",
        Component: Revenue,
      },
      {
        path: "cart",
        Component: Cart,
      },
    ],
  },
]);
