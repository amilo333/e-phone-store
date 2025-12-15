import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-image-gallery/styles/css/image-gallery.css";
import { RouterProvider } from "react-router";
import { Toaster as ToasterProvider } from "sonner";
import { router } from "./routers";
import { theme } from "./themes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToasterProvider
          className="toaster-provider"
          position="top-right"
          offset={{ top: "24px", right: "24px" }}
          mobileOffset={{ top: "10px", right: "10px" }}
          toastOptions={{ duration: 5000 }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
