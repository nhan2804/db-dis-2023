import { createPrescription } from "@modules/prescriptions/services";
import { useMutation, useQueryClient } from "react-query";

const useCreatePrescription = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createPrescription(formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["prescriptions"]);
    },
  });
};

export default useCreatePrescription;
