import { lazy } from "react";
import MyPrescription from "../pages/MyPrescription";
const PrescriptionHome = lazy(() => import("../pages"));
const prescriptionRoutes = [
  {
    component: PrescriptionHome,
    path: "/prescriptions",
  },
  {
    component: MyPrescription,
    path: "/prescriptions/my",
  },
];
export default prescriptionRoutes;
