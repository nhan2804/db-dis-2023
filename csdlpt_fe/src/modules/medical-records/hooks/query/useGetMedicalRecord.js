import { fetchMedicalRecord } from "@modules/medical-records/services";
import { fetchProject } from "@modules/projects/services";
import { useQuery } from "react-query";

const useGetMedicalRecord = () => {
  return useQuery(["medical-records"], async () => {
    const { data } = await fetchMedicalRecord();
    return data;
  });
};

export default useGetMedicalRecord;
