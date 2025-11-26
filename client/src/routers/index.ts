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
]);
