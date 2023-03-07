import { lazy } from "react";
const DepartmentHome = lazy(() => import("../pages"));
const depRoutes = [
  {
    component: DepartmentHome,
    path: "/departments",
  },
];
export default depRoutes;
