import { fetchMedicine } from "@modules/medicines/services";
import { fetchProject } from "@modules/projects/services";
import { useQuery } from "react-query";

const useGetMedicine = () => {
  return useQuery(["medicines"], async () => {
    const { data } = await fetchMedicine();
    return data;
  });
};

export default useGetMedicine;
