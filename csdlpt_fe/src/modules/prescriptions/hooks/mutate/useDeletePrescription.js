import {
  createPrescription,
  deletePrescription,
} from "@modules/prescriptions/services";
import { useMutation, useQueryClient } from "react-query";

const useDeletePrescription = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id }) => {
      const { data } = await deletePrescription(_id);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["prescriptions"]);
    },
  });
};

export default useDeletePrescription;
