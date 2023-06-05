import { lazy } from "react";
const HospitalizationSlipHome = lazy(() => import("../pages"));
const hospitalizationSlipRoutes = [
  {
    component: HospitalizationSlipHome,
    path: "/hospitalization-slips",
  },
];
export default hospitalizationSlipRoutes;
