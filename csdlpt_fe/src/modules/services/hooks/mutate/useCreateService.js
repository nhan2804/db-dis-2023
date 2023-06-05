import { createService } from "@modules/services/services";
import { useMutation, useQueryClient } from "react-query";

const useCreateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createService(formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["services"]);
    },
  });
};

export default useCreateService;
