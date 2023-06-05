import { lazy } from "react";
const ServiceHome = lazy(() => import("../pages"));
const serviceRoutes = [
  {
    component: ServiceHome,
    path: "services",
    exact: true,
  },
];
export default serviceRoutes;
