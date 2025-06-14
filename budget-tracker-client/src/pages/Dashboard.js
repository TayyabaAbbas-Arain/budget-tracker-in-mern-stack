import React, { useEffect, useState } from 'react';
import API from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await API.get('/budget');
        setBudgets(res.data);
      } catch (error) {
        console.error(error);
        alert("Error loading budget data.");
      }
    };

    fetchBudgets();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Your Budgets</h2>
      <div className="card-container">
        {budgets.map((item) => (
          <div key={item._id} className="budget-card">
            <div className="card-content">
              <div className="card-title">{item.title}</div>
              <div className="card-value">Rs {item.amount}</div>
              <div className="card-category">{item.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
