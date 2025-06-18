import React, { useEffect, useState } from 'react';
import API from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const fetchBudgets = async () => {
    try {
      const res = await API.get('/budgets', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBudgets(res.data);
    } catch (error) {
      console.error(error);
      alert('Error loading budget data.');
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleAdd = async () => {
    if (!title || !amount || !category) return alert('Fill all fields!');
    try {
      await API.post(
        '/budgets',
        { title, amount, category },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTitle('');
      setAmount('');
      setCategory('');
      fetchBudgets();
    } catch (err) {
      alert('Error adding budget.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/budgets/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchBudgets();
    } catch (err) {
      alert('Error deleting budget.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Your Budgets</h2>
      </div>

      <div className="add-budget-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={handleAdd}>Add Budget</button>
      </div>

      <div className="card-container">
        {budgets.length === 0 ? (
          <p>No budgets yet.</p>
        ) : (
          budgets.map((item) => (
            <div key={item._id} className="budget-card">
              <div className="card-content">
                <div className="card-title">{item.title}</div>
                <div className="card-value">Rs {item.amount}</div>
                <div className="card-category">{item.category}</div>
                <div className="card-actions">
                  {/* You can add edit functionality too */}
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
