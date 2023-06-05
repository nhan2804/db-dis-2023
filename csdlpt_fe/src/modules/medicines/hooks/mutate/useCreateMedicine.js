import { createMedicine } from "@modules/medicines/services";
import { useMutation, useQueryClient } from "react-query";

const useCreateMedicine = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createMedicine(formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["medicines"]);
    },
  });
};

export default useCreateMedicine;
