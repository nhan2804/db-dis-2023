import { lazy } from "react";
const MedicineHome = lazy(() => import("../pages"));
const medicineRoutes = [
  {
    component: MedicineHome,
    path: "/medicines",
  },
];
export default medicineRoutes;
