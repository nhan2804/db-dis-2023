import { updateMedicalRecord } from "@modules/medical-records/services";
import { useMutation, useQueryClient } from "react-query";

const useUpdateMedicalRecord = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updateMedicalRecord(
        _id || formData?._id,
        formData
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["medical-records"]);
    },
  });
};

export default useUpdateMedicalRecord;
