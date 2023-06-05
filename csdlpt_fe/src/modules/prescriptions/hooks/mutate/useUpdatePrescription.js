import { updatePrescription } from "@modules/prescriptions/services";
import { useMutation, useQueryClient } from "react-query";

const useUpdatePrescription = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updatePrescription(_id || formData?._id, formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["prescriptions"]);
    },
  });
};

export default useUpdatePrescription;
