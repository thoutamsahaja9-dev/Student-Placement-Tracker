import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getPlacements = async () => {
  const response = await axios.get(`${API_URL}/placements`);
  return response.data;
};

export const addPlacement = async (placement) => {
  const response = await axios.post(`${API_URL}/placements`, placement);
  return response.data;
};

export const updatePlacement = async (id, placement) => {
  const response = await axios.put(`${API_URL}/placements/${id}`, placement);
  return response.data;
};

export const deletePlacement = async (id) => {
  await axios.delete(`${API_URL}/placements/${id}`);
};