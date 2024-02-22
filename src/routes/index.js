import React from "react";
import PathConstants from "./pathConstants";
import { MapContextProvider } from "../contexts/map-context";
import CreateUser from "../pages/CreateUser";

const Dashboard = React.lazy(() => import("../pages/Dashboad"));
const NetworkPoint = React.lazy(() => import("../pages/NetworkPoint"));
const Planing = React.lazy(() => import("../pages/Planing"));

const routes = [
  { path: PathConstants.DASHBOARD, element: <Dashboard />, index: true },
  {
    path: PathConstants.NETWORK_POINT,
    element: (
      <MapContextProvider>
        <NetworkPoint />
      </MapContextProvider>
    ),
  },
  { path: PathConstants.PLANING, element: <Planing /> },
  { path: PathConstants.CREATE_USER, element: <CreateUser /> },
];
export default routes;
