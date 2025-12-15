import withAuthRouter from "@/components/HOC/auth-router";
import MainLayout from "@/layouts/main-layout";
import Cart from "@/pages/cart";
import CategoryManament from "@/pages/category";
import ProductDetail from "@/pages/product/detail";
import ProducList from "@/pages/product/list";
import ProductManagement from "@/pages/product/management";
import ProductOrdered from "@/pages/product/ordered";
import Revenue from "@/pages/revenue";
import UserManagement from "@/pages/user/management";
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
        path: "cart",
        Component: Cart,
      },
      {
        path: "/product/management",
        Component: withAuthRouter(ProductManagement),
      },
      {
        path: "/product/ordered",
        Component: withAuthRouter(ProductOrdered),
      },
      {
        path: "/category/management",
        Component: withAuthRouter(CategoryManament),
      },
      {
        path: "/revenue",
        Component: withAuthRouter(Revenue),
      },
      {
        path: "/user/management",
        Component: withAuthRouter(UserManagement),
      },
    ],
  },
]);
