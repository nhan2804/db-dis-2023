import { updateService } from "@modules/services/services";
import { useMutation, useQueryClient } from "react-query";

const useUpdateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updateService(_id || formData?._id, formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["services"]);
    },
  });
};

export default useUpdateService;
