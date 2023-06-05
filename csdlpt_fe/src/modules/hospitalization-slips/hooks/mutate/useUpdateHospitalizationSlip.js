import { updateHospitalizationSlip } from "@modules/hospitalization-slips/services";
import { useMutation, useQueryClient } from "react-query";

const useUpdateHospitalizationSlip = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updateHospitalizationSlip(
        _id || formData?._id,
        formData
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["hospitalization-slips"]);
    },
  });
};

export default useUpdateHospitalizationSlip;
