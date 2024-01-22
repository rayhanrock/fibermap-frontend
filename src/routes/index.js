import React from "react";
import PathConstants from "./pathConstants";

const Dashboard = React.lazy(() => import("../pages/Dashboad"));
const NetworkPoint = React.lazy(() => import("../pages/NetworkPoint"));
const Planing = React.lazy(() => import("../pages/Planing"));

const routes = [
  { path: PathConstants.DASHBOARD, element: <Dashboard /> },
  {
    path: PathConstants.NETWORK_POINT,
    element: <NetworkPoint />,
  },
  { path: PathConstants.PLANING, element: <Planing /> },
];
export default routes;
