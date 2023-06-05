import { fetchDepartment } from "@modules/departments/services";
import { fetchProject } from "@modules/projects/services";
import { useQuery } from "react-query";

const useGetDepartment = () => {
  return useQuery(["departments"], async () => {
    const { data } = await fetchDepartment();
    return data;
  });
};

export default useGetDepartment;
