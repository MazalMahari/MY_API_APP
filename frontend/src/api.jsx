//src/api.js

import axios from 'axios';
const API_BASE_URL= 'https://my-api-app-19.onrender.com'
export const getCodeBlocks = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/codeblocks`);
  return response.data;
};

export const getCodeBlock = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/api/codeblocks/${id}`);
  return response.data;
};
