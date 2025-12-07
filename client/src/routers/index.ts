import MainLayout from "@/layouts/main-layout";
import Cart from "@/pages/cart";
import ProducList from "@/pages/product/list";
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
        path: "cart",
        Component: Cart,
      },
    ],
  },
]);
