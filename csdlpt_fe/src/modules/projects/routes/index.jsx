import { lazy } from "react";
import React from "react";
const FormPage = lazy(() => import("../pages/form/form"));
const ProjectPage = lazy(() => import(".."));
const SheetPage = lazy(() => import("../pages/sheets"));

const projectsRoutes = [
  {
    component: ProjectPage,
    path: "/projects",
    isPrivate: true,
  },
  {
    component: FormPage,
    path: "/projects/:id/form",
    isPrivate: true,
  },
  {
    component: SheetPage,
    path: "/projects/:id",
    isPrivate: true,
  },
  // {
  //   component: Register,
  //   path: "/register",
  // },
  // {
  //   component: ForgetPassword,
  //   path: "/forget-password",
  //   exact: true,
  // },
];
export default projectsRoutes;
