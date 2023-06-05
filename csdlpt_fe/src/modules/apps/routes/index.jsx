import { lazy } from "react";
const AppHome = lazy(() => import("../pages/index"));
const appRoutes = [
  {
    component: AppHome,
    path: "/app",
    isPrivate: true,
  },
  // {
  //   component: AppHome,
  //   path: "/",
  //   isPrivate: true,
  // },
];
export default appRoutes;
