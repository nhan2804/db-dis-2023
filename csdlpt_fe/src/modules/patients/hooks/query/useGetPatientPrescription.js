import {
  fetchPatientMedicalRecord,
  fetchPatientPrescription,
} from "@modules/patients/services";
import { useQuery } from "react-query";

const useGetPatientPrescription = (patientId) => {
  return useQuery(["patients", patientId, "prescriptions"], async () => {
    const { data } = await fetchPatientPrescription(patientId);
    return data;
  });
};

export default useGetPatientPrescription;
