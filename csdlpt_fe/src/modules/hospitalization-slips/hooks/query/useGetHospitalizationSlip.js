import { fetchHospitalizationSlip } from "@modules/hospitalization-slips/services";
import { fetchProject } from "@modules/projects/services";
import { useQuery } from "react-query";

const useGetHospitalizationSlip = () => {
  return useQuery(["hospitalization-slips"], async () => {
    const { data } = await fetchHospitalizationSlip();
    return data;
  });
};

export default useGetHospitalizationSlip;
