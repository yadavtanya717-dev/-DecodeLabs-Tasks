import axios from "axios";

const BASE_URL = "https://project-2-backend-rbtk.onrender.com";

export const generateCopy = async (data) => {
  const res = await axios.post(`${BASE_URL}/generate`, data);
  return res.data;
};