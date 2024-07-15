import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';  // Base URL del backend de Django

export const getCsrfToken = async () => {
  const response = await axios.get(`${API_BASE_URL}/myapp/csrf-token/`, { withCredentials: true });
  axios.defaults.headers.post['X-CSRFToken'] = response.data.csrfToken;
};

export const registerUser = async (username, first_name, last_name, email, password, confirmPassword) => {
  await getCsrfToken();
  const response = await axios.post(`${API_BASE_URL}/myapp/signup/`, {
    username,
    first_name,
    last_name,
    email,
    password1: password,
    password2: confirmPassword
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });
  return response.data;
};

export const loginUser = async (username, password) => {
  await getCsrfToken();
  const response = await axios.post(`${API_BASE_URL}/myapp/api/token/`, { username, password }, { withCredentials: true });
  const token = response.data.access; // Cambiado a response.data.access
  console.log('Token obtenido:', token); // Añade esta línea para depurar
  localStorage.setItem('authToken', token);
  return response.data;
};


export const recoverUsername = async (email) => {
  await getCsrfToken();
  const response = await axios.post(`${API_BASE_URL}/myapp/recover-username/`, { email }, { withCredentials: true });
  return response.data;
};

export const resetPassword = async (email) => {
  await getCsrfToken();
  const response = await axios.post(`${API_BASE_URL}/myapp/reset_password/`, { email }, { withCredentials: true });
  return response.data;
};

export const resetPasswordConfirm = async (uid, token, newPassword1, newPassword2) => {
  await getCsrfToken();
  const response = await axios.post(`${API_BASE_URL}/myapp/reset_password_confirm/${uid}/${token}/`, {
    new_password1: newPassword1,
    new_password2: newPassword2,
  }, { withCredentials: true });
  return response.data;
};

export const verifyToken = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/myapp/verify-token/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};
