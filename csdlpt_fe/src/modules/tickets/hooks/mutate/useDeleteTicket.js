import { createTicket, deleteTicket } from "@modules/tickets/services";
import { useMutation, useQueryClient } from "react-query";

const useDeleteTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ _id }) => {
      const { data } = await deleteTicket(_id);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries(["tickets"]);
    },
  });
};

export default useDeleteTicket;
