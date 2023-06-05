import { fetchDoctor } from "@modules/doctors/services";
import { fetchProject } from "@modules/projects/services";
import { useQuery } from "react-query";

const useGetDoctor = () => {
  return useQuery(["doctors"], async () => {
    const { data } = await fetchDoctor();
    return data;
  });
};

export default useGetDoctor;
