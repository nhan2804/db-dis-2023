import { createMedicine, deleteMedicine } from "@modules/medicines/services";
import { useMutation, useQueryClient } from "react-query";

const useDeleteMedicine = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id }) => {
      const { data } = await deleteMedicine(_id);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["medicines"]);
    },
  });
};

export default useDeleteMedicine;
