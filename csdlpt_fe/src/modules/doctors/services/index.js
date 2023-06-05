import axios from "axios";

export const createDoctor = (data) => {
  return axios.post("doctors", data);
};
export const updateDoctor = (idDoctor, data) => {
  return axios.patch(`doctors/${idDoctor}`, data);
};
export const deleteDoctor = (idDoctor) => {
  return axios.delete(`doctors/${idDoctor}`);
};
export const fetchDoctor = () => {
  return axios.get("doctors");
};
