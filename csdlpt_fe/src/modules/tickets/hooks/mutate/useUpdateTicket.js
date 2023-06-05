import { updateTicket } from "@modules/tickets/services";
import { useMutation, useQueryClient } from "react-query";

const useUpdateTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData, _id }) => {
      const { data } = await updateTicket(_id || formData?._id, formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["tickets"]);
    },
  });
};

export default useUpdateTicket;
