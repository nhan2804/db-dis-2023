import { updateDoctor } from "@modules/doctors/services";
import { useMutation, useQueryClient } from "react-query";

const useUpdateDoctor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updateDoctor(_id || formData?._id, formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["doctors"]);
    },
  });
};

export default useUpdateDoctor;
