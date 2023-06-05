import { lazy } from "react";
import PatientDetail from "../pages/PatientDetail";
const PatientHome = lazy(() => import("../pages"));
const patientRoutes = [
  {
    component: PatientHome,
    path: "/patients",
  },
  {
    component: PatientDetail,
    path: "/patients/:patientId",
  },
];
export default patientRoutes;
