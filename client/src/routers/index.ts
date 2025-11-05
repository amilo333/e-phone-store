import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/login";

export const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);
