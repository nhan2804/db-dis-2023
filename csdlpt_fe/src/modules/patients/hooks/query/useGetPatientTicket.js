import { fetchPatientTicket } from "@modules/patients/services";
import { useQuery } from "react-query";

const useGetPatientTicket = (patientId) => {
  return useQuery(["patients", patientId, "tickets"], async () => {
    const { data } = await fetchPatientTicket(patientId);
    return data;
  });
};

export default useGetPatientTicket;
