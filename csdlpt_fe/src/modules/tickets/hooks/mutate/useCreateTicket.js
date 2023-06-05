import { createTicket } from "@modules/tickets/services";
import { useMutation, useQueryClient } from "react-query";

const useCreateTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await createTicket(formData);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["tickets"]);
    },
  });
};

export default useCreateTicket;
