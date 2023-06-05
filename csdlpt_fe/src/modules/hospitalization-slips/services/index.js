import axios from "axios";

export const createHospitalizationSlip = (data) => {
  return axios.post("hospitalization-slips", data);
};
export const updateHospitalizationSlip = (idHospitalizationSlip, data) => {
  return axios.patch(`hospitalization-slips/${idHospitalizationSlip}`, data);
};
export const deleteHospitalizationSlip = (idHospitalizationSlip) => {
  return axios.delete(`hospitalization-slips/${idHospitalizationSlip}`);
};
export const fetchHospitalizationSlip = () => {
  return axios.get("hospitalization-slips");
};
