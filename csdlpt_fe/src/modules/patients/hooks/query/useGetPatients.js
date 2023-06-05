import { fetchPatients } from "@modules/patients/services";
import { fetchProject } from "@modules/projects/services";
import { useQuery } from "react-query";

const useGetPatients = () => {
  return useQuery(["patients"], async () => {
    const { data } = await fetchPatients();
    return data;
  });
};

export default useGetPatients;
