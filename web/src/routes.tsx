import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./pages/Landing";
import OrphanagesMap from "./pages/OrphanagesMap";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/app",
      element: <OrphanagesMap />,
    },
  ]);

  return <RouterProvider router={router} />;
}
