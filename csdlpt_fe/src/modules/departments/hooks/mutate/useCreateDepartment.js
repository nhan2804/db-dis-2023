import { createDepartment } from "@modules/departments/services";
import { useMutation, useQueryClient } from "react-query";

const useCreateDepartment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createDepartment(formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["departments"]);
    },
  });
};

export default useCreateDepartment;
