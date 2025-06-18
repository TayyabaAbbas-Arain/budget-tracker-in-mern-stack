import axios from 'axios';

// Use full base URL to avoid confusion
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to every request if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

// Now both use API instance
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
