import axios from "axios";

export const createDepartment = (data) => {
  return axios.post("departments", data);
};
export const updateDepartment = (idDepartment, data) => {
  return axios.patch(`departments/${idDepartment}`, data);
};
export const deleteDepartment = (idDepartment) => {
  return axios.delete(`departments/${idDepartment}`);
};
export const fetchDepartment = () => {
  return axios.get("departments");
};
