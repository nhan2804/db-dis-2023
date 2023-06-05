import { createHospitalizationSlip } from "@modules/hospitalization-slips/services";
import { useMutation, useQueryClient } from "react-query";

const useCreateHospitalizationSlip = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createHospitalizationSlip(formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["hospitalization-slips"]);
    },
  });
};

export default useCreateHospitalizationSlip;
