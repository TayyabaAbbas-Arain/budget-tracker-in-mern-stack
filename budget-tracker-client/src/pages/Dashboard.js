import React, { useEffect, useState } from 'react';
import API from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch budgets
  const fetchBudgets = async () => {
    try {
      const res = await API.get('/budgets');
      setBudgets(res.data);
    } catch (error) {
      console.error(error);
      alert('Error loading budget data.');
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  // Add or Update budget
  const handleSubmit = async () => {
    if (!title || !amount || !category) return alert('Fill all fields!');
    try {
      if (editMode) {
        await API.put(`/budgets/${editId}`, { title, amount, category });
        setEditMode(false);
        setEditId(null);
      } else {
        await API.post('/budgets', { title, amount, category });
      }
      setTitle('');
      setAmount('');
      setCategory('');
      fetchBudgets();
    } catch (err) {
      alert('Error saving budget.');
    }
  };

  // Delete budget
  const handleDelete = async (id) => {
    try {
      await API.delete(`/budgets/${id}`);
      fetchBudgets();
    } catch (err) {
      alert('Error deleting budget.');
    }
  };

  // Prepare edit form
  const handleEdit = (item) => {
    setTitle(item.title);
    setAmount(item.amount);
    setCategory(item.category);
    setEditId(item._id);
    setEditMode(true);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Your Budgets</h2>

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
        <button onClick={handleSubmit}>{editMode ? 'Update' : 'Add'} Budget</button>
        {editMode && (
          <button className="cancel-btn" onClick={() => {
            setEditMode(false);
            setTitle('');
            setAmount('');
            setCategory('');
            setEditId(null);
          }}>
            Cancel
          </button>
        )}
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
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
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
