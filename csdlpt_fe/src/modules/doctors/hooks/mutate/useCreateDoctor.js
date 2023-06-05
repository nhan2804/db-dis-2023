import { createDoctor } from "@modules/doctors/services";
import { useMutation, useQueryClient } from "react-query";

const useCreateDoctor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createDoctor(formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["doctors"]);
    },
  });
};

export default useCreateDoctor;
