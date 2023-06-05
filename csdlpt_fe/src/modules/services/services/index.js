import axios from "axios";

export const createService = (data) => {
  return axios.post("services", data);
};
export const updateService = (idService, data) => {
  return axios.patch(`services/${idService}`, data);
};
export const deleteService = (idService) => {
  return axios.delete(`services/${idService}`);
};
export const fetchService = () => {
  return axios.get("services");
};
