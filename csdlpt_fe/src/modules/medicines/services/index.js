import axios from "axios";

export const createMedicine = (data) => {
  return axios.post("medicines", data);
};
export const updateMedicine = (idMedicine, data) => {
  return axios.patch(`medicines/${idMedicine}`, data);
};
export const deleteMedicine = (idMedicine) => {
  return axios.delete(`medicines/${idMedicine}`);
};
export const fetchMedicine = () => {
  return axios.get("medicines");
};
