import { updateMedicine } from "@modules/medicines/services";
import { useMutation, useQueryClient } from "react-query";

const useUpdateMedicine = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updateMedicine(_id || formData?._id, formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["medicines"]);
    },
  });
};

export default useUpdateMedicine;
