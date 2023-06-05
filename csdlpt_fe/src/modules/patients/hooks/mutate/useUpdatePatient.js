import { updatePatient } from "@modules/patients/services";
import { useMutation, useQueryClient } from "react-query";

const useUpdatePatient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updatePatient(_id || formData?._id, formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["patients"]);
    },
  });
};

export default useUpdatePatient;
