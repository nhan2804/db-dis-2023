import { createPatient } from "@modules/patients/services";
import { useMutation, useQueryClient } from "react-query";

const useCreatePatient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createPatient(formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["patients"]);
    },
  });
};

export default useCreatePatient;
