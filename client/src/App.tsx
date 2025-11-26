import { ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router";
import { router } from "./routers";
import { theme } from "./themes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
