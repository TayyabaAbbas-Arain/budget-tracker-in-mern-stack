import React, { useState } from 'react';
import { addBudget } from '../services/budgetService';

const Budget = ({ onBudgetAdded }) => {
  const [form, setForm] = useState({ title: '', amount: '', category: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBudget(form);
    setForm({ title: '', amount: '', category: '' });
    onBudgetAdded(); // Call parent to refresh list
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded space-y-2">
      <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
      <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Budget</button>
    </form>
  );
};

export default Budget;
