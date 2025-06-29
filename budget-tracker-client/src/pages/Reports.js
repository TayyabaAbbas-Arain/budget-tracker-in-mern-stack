// src/pages/Reports.js
import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { getBudgets } from '../services/budgetService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} 
from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Reports = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBudgets();
        setBudgets(res.data);
      } catch (err) {
        alert('Error loading budgets.');
      }
    };
    fetchData();
  }, []);

  // Aggregate by category
  const categoryTotals = budgets.reduce((acc, item) => {
    if (acc[item.category]) {
      acc[item.category] += item.amount;
    } else {
      acc[item.category] = item.amount;
    }
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const dataValues = Object.values(categoryTotals);

  const barData = {
    labels,
    datasets: [
      {
        label: 'Expenses by Category',
        data: dataValues,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: 'Expenses Distribution',
        data: dataValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
      },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Expense Reports 📊</h2>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Bar data={barData} />
      </div>

      <div style={{ maxWidth: '400px', margin: '20px auto' }}>
        <Pie data={pieData} />
      </div>

      <h3>Total Spent: Rs {budgets.reduce((sum, b) => sum + b.amount, 0)}</h3>
    </div>
  );
};

export default Reports;
