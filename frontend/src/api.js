import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/accounts/';

export const registerUser = async (first_name, last_name, email, password) => {
  const response = await axios.post(`${API_URL}register/`, {
    first_name,
    last_name,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}login/`, {
    username: email, // Usar email como username
    password,
  });
  return response.data;
};
