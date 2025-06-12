import React from 'react';
import '../App.css'; // ✅ Make sure App.css is imported

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Budget Dashboard</h2>

      <div className="budget-card">
        <h3>Total Budget</h3>
        <p>$5,000</p>
      </div>

      <div className="budget-card">
        <h3>Expenses</h3>
        <p>$2,000</p>
      </div>

      <div className="budget-card">
        <h3>Remaining</h3>
        <p>$3,000</p>
      </div>
    </div>
  );
};

export default Dashboard;
git add src/pages/Dashboard.js