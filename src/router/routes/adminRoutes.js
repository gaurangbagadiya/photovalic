import { lazy } from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

// const Dashboard = lazy(() => import("../../views/pages/Dashboard/dashboard"));
const Dashboard = lazy(() => import("../../views/dashboard/analytics"));
let user = JSON.parse(secureLocalStorage.getItem("userData"));
let AdminRoutes = [];

AdminRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];
export default AdminRoutes;
