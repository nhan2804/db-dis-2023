import {
  createMedicalRecord,
  deleteMedicalRecord,
} from "@modules/medical-records/services";
import { useMutation, useQueryClient } from "react-query";

const useDeleteMedicalRecord = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id }) => {
      const { data } = await deleteMedicalRecord(_id);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["medical-records"]);
    },
  });
};

export default useDeleteMedicalRecord;
