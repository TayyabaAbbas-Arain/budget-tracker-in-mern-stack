// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('all');

  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const categoryOptions = [
    'Food',
    'Rent',
    'Bills',
    'Entertainment',
    'Shopping',
    'Transport',
    'Salary',
    'Other',
  ];

  const fetchBudgets = async () => {
    try {
      const res = await API.get('/budgets');
      setBudgets(res.data);
    } catch (error) {
      console.error(error);
      setFormError('Error loading budget data.');
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleSubmit = async () => {
    setFormError('');
    setSuccessMessage('');

    if (!title || !amount || (!category && !customCategory)) {
      return setFormError('Please fill out all fields.');
    }

    if (Number(amount) <= 0) {
      return setFormError('Amount must be a positive number.');
    }

    const finalCategory = category === 'Other' ? customCategory : category;

    try {
      if (editMode) {
        await API.put(`/budgets/${editId}`, { title, amount, category: finalCategory });
        setSuccessMessage('Budget updated successfully.');
        setEditMode(false);
        setEditId(null);
      } else {
        await API.post('/budgets', { title, amount, category: finalCategory });
        setSuccessMessage('Budget added successfully.');
      }

      setTitle('');
      setAmount('');
      setCategory('');
      setCustomCategory('');
      fetchBudgets();

      // Auto hide success message after 3 sec
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setFormError('Error saving budget. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this budget?');
    if (!confirmDelete) return;

    try {
      await API.delete(`/budgets/${id}`);
      setSuccessMessage('Budget deleted successfully.');
      fetchBudgets();

      // Auto hide success message after 3 sec
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setFormError('Error deleting budget. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setFormError('');
    setSuccessMessage('');
    setTitle(item.title);
    setAmount(item.amount);

    if (categoryOptions.includes(item.category)) {
      setCategory(item.category);
      setCustomCategory('');
    } else if (item.category && item.category.trim() !== '') {
      setCategory('Other');
      setCustomCategory(item.category);
    } else {
      setCategory('');
      setCustomCategory('');
    }

    setEditId(item._id);
    setEditMode(true);
  };

  const filteredBudgets = budgets.filter((item) => {
    if (filter === 'all') return true;
    const itemDate = new Date(item.createdAt);
    const now = new Date();
    if (filter === '7days') {
      const diff = (now - itemDate) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }
    if (filter === '30days') {
      const diff = (now - itemDate) / (1000 * 60 * 60 * 24);
      return diff <= 30;
    }
    return true;
  });

  const totalAmount = filteredBudgets.reduce((sum, b) => sum + Number(b.amount), 0);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">{editMode ? 'Edit Budget' : 'Add New Budget'}</h2>

      {formError && <div className="error-message">{formError}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

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
        <select
          value={category || ''}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {category === 'Other' && (
          <input
            type="text"
            placeholder="Specify Category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
          />
        )}
        <button onClick={handleSubmit}>
          {editMode ? 'Update Budget' : 'Add Budget'}
        </button>
        {editMode && (
          <button
            className="cancel-btn"
            onClick={() => {
              setEditMode(false);
              setTitle('');
              setAmount('');
              setCategory('');
              setCustomCategory('');
              setEditId(null);
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <h2 className="dashboard-title">Your Budgets</h2>

      <div className="budget-filters">
        <label>Show:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Budgets</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
        </select>
      </div>

      <div className="budget-summary">
        <p>Total Budgets: {filteredBudgets.length}</p>
        <p>Total Amount: Rs {totalAmount}</p>
      </div>

      <div className="card-container">
        {filteredBudgets.length === 0 ? (
          <p>No budgets found.</p>
        ) : (
          filteredBudgets.map((item) => (
            <div key={item._id} className="budget-card">
              <div className="card-content">
                <div className="card-title">{item.title}</div>
                <div className="card-value">Rs {item.amount}</div>
                <div className="card-category">{item.category}</div>
                <div className="card-actions">
                  <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
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
