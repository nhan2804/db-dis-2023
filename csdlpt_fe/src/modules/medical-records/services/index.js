import axios from "axios";

export const createMedicalRecord = (data) => {
  return axios.post("medical-records", data);
};
export const updateMedicalRecord = (idMedicalRecord, data) => {
  return axios.patch(`medical-records/${idMedicalRecord}`, data);
};
export const deleteMedicalRecord = (idMedicalRecord) => {
  return axios.delete(`medical-records/${idMedicalRecord}`);
};
export const fetchMedicalRecord = () => {
  return axios.get("medical-records");
};
