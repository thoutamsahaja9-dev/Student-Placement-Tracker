import axios from "axios";

const API_URL = "https://student-placement-tracker-jrnn.onrender.com";

export const getStudents = async (search = "") => {
  const response = await axios.get(
    `${API_URL}/students?search=${search}`
  );
  return response.data;
};
export const addStudent = async (student) => {
    const response = await axios.post(`${API_URL}/students`, student);
    return response.data;
};
export const deleteStudent = async (id) => {
  await axios.delete(`${API_URL}/students/${id}`);
};
export const updateStudent = async (id, student) => {
  const response = await axios.put(`${API_URL}/students/${id}`, student);
  return response.data;
};