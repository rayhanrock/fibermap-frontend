import React from "react";
import PathConstants from "./pathConstants";
import { MapContextProvider } from "../contexts/map-context";

const Dashboard = React.lazy(() => import("../pages/Dashboad"));
const NetworkPoint = React.lazy(() => import("../pages/NetworkPoint"));
const Planing = React.lazy(() => import("../pages/Planing"));

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
