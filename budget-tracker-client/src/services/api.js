import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const register = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);

export const getBudgets = (token) => API.get('/budgets', { headers: { Authorization: `Bearer ${token}` } });
export const addBudget = (budget, token) => API.post('/budgets', budget, { headers: { Authorization: `Bearer ${token}` } });
export const updateBudget = (id, budget, token) => API.put(`/budgets/${id}`, budget, { headers: { Authorization: `Bearer ${token}` } });
export const deleteBudget = (id, token) => API.delete(`/budgets/${id}`, { headers: { Authorization: `Bearer ${token}` } });
