import { lazy } from "react";
const DepartmentHome = lazy(() => import("../pages"));
const depRoutes = [
  {
    component: DepartmentHome,
    path: "departments",
    exact: true,
  },
];
export default depRoutes;
