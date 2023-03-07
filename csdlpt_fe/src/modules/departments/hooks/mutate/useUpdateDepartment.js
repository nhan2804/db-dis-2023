import { updateDepartment } from "@modules/departments/services";
import { useMutation, useQueryClient } from "react-query";

const useUpdateDepartment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updateDepartment(_id || formData?._id, formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["departments"]);
    },
  });
};

export default useUpdateDepartment;
