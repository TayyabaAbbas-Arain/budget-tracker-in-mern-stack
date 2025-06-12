import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetCount, setBudgetCount] = useState(0);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/budgets');
        const budgets = res.data;

        const total = budgets.reduce((sum, item) => sum + item.amount, 0);
        setTotalBudget(total);
        setBudgetCount(budgets.length);
      } catch (err) {
        console.error('Failed to fetch budget data', err);
      }
    };

    fetchBudgets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="bg-green-100 p-4 rounded mb-3">
        <p className="text-xl">Total Budget Entries: <strong>{budgetCount}</strong></p>
        <p className="text-xl">Total Budget Amount: <strong>Rs {totalBudget}</strong></p>
      </div>
    </div>
  );
};

export default Dashboard;
