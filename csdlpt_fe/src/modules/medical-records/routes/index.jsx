import { lazy } from "react";
import MyMedicalRecord from "../pages/MyMedicalRecord";
const MedicalRecordHome = lazy(() => import("../pages"));
const medicalRecordRoutes = [
  {
    component: MedicalRecordHome,
    path: "/medical-records",
  },
  {
    component: MyMedicalRecord,
    path: "/medical-records/my",
  },
];
export default medicalRecordRoutes;
