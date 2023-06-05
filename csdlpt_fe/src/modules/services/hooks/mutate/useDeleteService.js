import { createService, deleteService } from "@modules/services/services";
import { useMutation, useQueryClient } from "react-query";

const useDeleteService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id }) => {
      const { data } = await deleteService(_id);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["services"]);
    },
  });
};

export default useDeleteService;
