import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const generateCopy = async (data) => {
  const res = await axios.post(`${BASE_URL}/generate`, data);
  return res.data;
};