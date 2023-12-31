import React from "react";
import PathConstants from "./pathConstants";

const Dashboard = React.lazy(() => import("../pages/Dashboad"));
const NetworkPoint = React.lazy(() => import("../pages/NetworkPoint"));
const Planing = React.lazy(() => import("../pages/Planing"));
import { MapContextProvider } from "../store/map-context";

const routes = [
  { path: PathConstants.DASHBOARD, element: <Dashboard /> },
  {
    path: PathConstants.NETWORK_POINT,
    element: (
      <MapContextProvider>
        <NetworkPoint />
      </MapContextProvider>
    ),
  },
  { path: PathConstants.PLANING, element: <Planing /> },
];
export default routes;
