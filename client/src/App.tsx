import { RouterProvider } from "react-router";
import { router } from "./routers";

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />;
    </I18nextProvider>
  );
}
