import axios from 'axios';

// Create Axios instance with baseURL
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // 👈 Backend server URL
});

// 🔐 Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ✅ Auth APIs
export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);

// ✅ Budget APIs
export const getBudgets = () => API.get('/budgets');
export const addBudget = (budget) => API.post('/budgets', budget);
export const updateBudget = (id, budget) => API.put(`/budgets/${id}`, budget);
export const deleteBudget = (id) => API.delete(`/budgets/${id}`);

export default API;
