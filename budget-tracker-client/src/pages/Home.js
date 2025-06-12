import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BudgetList from '../components/BudgetList';

const Home = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/budgets');
        setBudgets(res.data);
      } catch (err) {
        console.error('Failed to fetch budgets', err);
      }
    };

    fetchBudgets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Budgets</h1>
      <BudgetList budgets={budgets} />
    </div>
  );
};

export default Home;
