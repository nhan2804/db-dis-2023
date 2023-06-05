import axios from "axios";

export const createPrescription = (data) => {
  return axios.post("prescriptions", data);
};
export const updatePrescription = (idPrescription, data) => {
  return axios.patch(`prescriptions/${idPrescription}`, data);
};
export const deletePrescription = (idPrescription) => {
  return axios.delete(`prescriptions/${idPrescription}`);
};
export const fetchPrescription = () => {
  return axios.get("prescriptions");
};
