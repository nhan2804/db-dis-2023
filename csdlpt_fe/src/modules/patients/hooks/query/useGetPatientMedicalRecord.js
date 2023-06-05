import { fetchPatientMedicalRecord } from "@modules/patients/services";
import { useQuery } from "react-query";

const useGetPatientMedicalRecord = (patientId) => {
  return useQuery(["patients", patientId, "medical-records"], async () => {
    const { data } = await fetchPatientMedicalRecord(patientId);
    return data;
  });
};

export default useGetPatientMedicalRecord;
