import {
  createHospitalizationSlip,
  deleteHospitalizationSlip,
} from "@modules/hospitalization-slips/services";
import { useMutation, useQueryClient } from "react-query";

const useDeleteHospitalizationSlip = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id }) => {
      const { data } = await deleteHospitalizationSlip(_id);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["hospitalization-slips"]);
    },
  });
};

export default useDeleteHospitalizationSlip;
