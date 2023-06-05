import { fetchPrescription } from "@modules/prescriptions/services";
import { fetchProject } from "@modules/projects/services";
import { useQuery } from "react-query";

const useGetPrescription = () => {
  return useQuery(["prescriptions"], async () => {
    const { data } = await fetchPrescription();
    return data;
  });
};

export default useGetPrescription;
