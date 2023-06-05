import { fetchTicket } from "@modules/tickets/services";
import { fetchProject } from "@modules/projects/services";
import { useQuery } from "react-query";

const useGetTicket = () => {
  return useQuery(["tickets"], async () => {
    const { data } = await fetchTicket();
    return data;
  });
};

export default useGetTicket;
