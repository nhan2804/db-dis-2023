import { fetchService } from "@modules/services/services";
import { fetchProject } from "@modules/projects/services";
import { useQuery } from "react-query";

const useGetService = () => {
  return useQuery(["services"], async () => {
    const { data } = await fetchService();
    return data;
  });
};

export default useGetService;
