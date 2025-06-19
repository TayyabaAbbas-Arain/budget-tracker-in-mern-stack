// src/services/budgetService.js
import axios from 'axios';

export const addBudget = async (budgetData) => {
  const token = localStorage.getItem('token'); // ✅ Get token
  try {
    const res = await axios.post(
      '/api/budgets', 
      budgetData, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("❌ Error adding budget:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to add budget');
  }
};
