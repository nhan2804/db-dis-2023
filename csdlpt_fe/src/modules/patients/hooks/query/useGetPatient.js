import { fetchPatient, fetchPatients } from "@modules/patients/services";
import { fetchProject } from "@modules/projects/services";
import { useQuery } from "react-query";

const useGetPatient = (patientId) => {
  return useQuery(["patients", patientId], async () => {
    const { data } = await fetchPatient(patientId);
    return data;
  });
};

export default useGetPatient;
