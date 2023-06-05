import appRoutes from "@modules/apps/routes";
import authRoute from "@modules/auth/routes";
import depRoutes from "@modules/departments/routes";
import doctorRoutes from "@modules/doctors/routes";
import hospitalizationSlipRoutes from "@modules/hospitalization-slips/routes";
import medicalRecordRoutes from "@modules/medical-records/routes";
import medicineRoutes from "@modules/medicines/routes";
import patientRoutes from "@modules/patients/routes";
import prescriptionRoutes from "@modules/prescriptions/routes";
import AppLayout from "@layout/AppLayout";
import serviceRoutes from "@modules/services/routes";
import ticketRoutes from "@modules/tickets/routes";
const routes = [
  ...authRoute,
  ...appRoutes,
  {
    component: AppLayout,
    path: "/",
    isPrivate: true,
    // exact: true,
    children: [
      ...depRoutes,
      ...doctorRoutes,
      ...hospitalizationSlipRoutes,
      ...medicalRecordRoutes,
      ...patientRoutes,
      ...prescriptionRoutes,
      ...medicineRoutes,
      ...serviceRoutes,
      ...ticketRoutes,
    ],
  },
];
export default routes;
