import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Budget APIs
export const addBudget = (budget) => API.post('/budgets', budget);
export const getBudgets = () => API.get('/budgets');
export const updateBudget = (id, budget) => API.put(`/budgets/${id}`, budget);
export const deleteBudget = (id) => API.delete(`/budgets/${id}`);

export default API;
