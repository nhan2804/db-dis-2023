import { createMedicalRecord } from "@modules/medical-records/services";
import { useMutation, useQueryClient } from "react-query";

const useCreateMedicalRecord = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createMedicalRecord(formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["medical-records"]);
    },
  });
};

export default useCreateMedicalRecord;
