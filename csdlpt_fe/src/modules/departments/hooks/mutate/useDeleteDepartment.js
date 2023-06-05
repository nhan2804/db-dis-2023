import { deleteDepartment } from "@modules/departments/services";
import { useMutation, useQueryClient } from "react-query";

const useDeleteDepartment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id }) => {
      const { data } = await deleteDepartment(_id);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["departments"]);
    },
  });
};

export default useDeleteDepartment;
