import { createDoctor, deleteDoctor } from "@modules/doctors/services";
import { useMutation, useQueryClient } from "react-query";

const useDeleteDoctor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id }) => {
      const { data } = await deleteDoctor(_id);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["doctors"]);
    },
  });
};

export default useDeleteDoctor;
