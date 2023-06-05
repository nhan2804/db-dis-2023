import { lazy } from "react";
import DoctorHome from "../pages";
// const DoctorHome = lazy(() => import("../pages"));
const doctorRoutes = [
  {
    component: () => <DoctorHome />,
    path: "doctors",
  },
];
export default doctorRoutes;
