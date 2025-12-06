import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router";
import { Toaster as ToasterProvider } from "sonner";
import { router } from "./routers";
import { theme } from "./themes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <ToasterProvider
        className="toaster-provider"
        position="top-right"
        offset={{ top: "24px", right: "24px" }}
        mobileOffset={{ top: "10px", right: "10px" }}
        toastOptions={{ duration: 5000 }}
      />
    </ThemeProvider>
  );
}
