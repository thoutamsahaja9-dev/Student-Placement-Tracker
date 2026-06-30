import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getCompanies = async () => {
  const response = await axios.get(`${API_URL}/companies`);
  return response.data;
};

export const addCompany = async (company) => {
  const response = await axios.post(`${API_URL}/companies`, company);
  return response.data;
};

export const updateCompany = async (id, company) => {
  const response = await axios.put(`${API_URL}/companies/${id}`, company);
  return response.data;
};

export const deleteCompany = async (id) => {
  await axios.delete(`${API_URL}/companies/${id}`);
};