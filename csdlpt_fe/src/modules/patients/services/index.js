import axios from "axios";

export const createPatient = (data) => {
  return axios.post("patients", data);
};
export const updatePatient = (idPatient, data) => {
  return axios.patch(`patients/${idPatient}`, data);
};
export const deletePatient = (idPatient) => {
  return axios.delete(`patients/${idPatient}`);
};
export const fetchPatients = () => {
  return axios.get("patients");
};
export const fetchPatient = (patientId) => {
  return axios.get(`patients/${patientId}`);
};
export const fetchPatientPrescription = (patientId) => {
  return axios.get(`patients/${patientId}/prescriptions`);
};
export const fetchPatientTicket = (patientId) => {
  return axios.get(`patients/${patientId}/tickets`);
};
export const fetchPatientMedicalRecord = (patientId) => {
  return axios.get(`patients/${patientId}/medical-records`);
};
