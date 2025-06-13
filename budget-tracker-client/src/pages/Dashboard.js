import React from "react";
import "../App.css"; 
import { FaMoneyBillWave, FaShoppingCart, FaWallet } from "react-icons/fa";

const Dashboard = () => {
  const totalBudget = 5000;
  const expenses = 2000;
  const remaining = totalBudget - expenses;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">💰 Welcome to Your Budget Dashboard</h1>

      <div className="budget-card">
        <FaMoneyBillWave className="card-icon income-icon" />
        <div>
          <h3>Total Budget</h3>
          <p>${totalBudget.toLocaleString()}</p>
        </div>
      </div>

      <div className="budget-card">
        <FaShoppingCart className="card-icon expense-icon" />
        <div>
          <h3>Expenses</h3>
          <p>${expenses.toLocaleString()}</p>
        </div>
      </div>

      <div className="budget-card">
        <FaWallet className="card-icon remaining-icon" />
        <div>
          <h3>Remaining</h3>
          <p>${remaining.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
