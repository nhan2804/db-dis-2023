import { createPatient, deletePatient } from "@modules/patients/services";
import { useMutation, useQueryClient } from "react-query";

const useDeletePatient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id }) => {
      const { data } = await deletePatient(_id);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["patients"]);
    },
  });
};

export default useDeletePatient;
