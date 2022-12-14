import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Landing from "./pages/Landing";
import OrphanagesMap from "./pages/OrphanagesMap";
import Orphanage from "./pages/Orphanage";
import CreateOrphanage from "./pages/CreateOrphanage";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/orphanages",
      element: <OrphanagesMap />,
    },
    {
      path: "/orphanages/create",
      element: <CreateOrphanage />,
    },
    {
      path: "/orphanages/:id",
      element: <Orphanage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
