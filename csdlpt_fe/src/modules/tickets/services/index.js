import axios from "axios";

export const createTicket = (data) => {
  return axios.post("tickets", data);
};
export const updateTicket = (idTicket, data) => {
  return axios.patch(`tickets/${idTicket}`, data);
};
export const deleteTicket = (idTicket) => {
  return axios.delete(`tickets/${idTicket}`);
};
export const fetchTicket = () => {
  return axios.get("tickets");
};
