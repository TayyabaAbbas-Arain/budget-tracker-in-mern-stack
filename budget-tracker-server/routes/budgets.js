//budget-tracker-server\routes\budgets.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Budget = require('../models/Budget');

// Get all budgets for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch(err) {
    res.status(500).send('Server error');
  }
});

// Add a budget
router.post('/', auth, async (req, res) => {
  const { title, amount, category } = req.body;
  if (!title || !amount || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newBudget = new Budget({
      user: req.user.id,
      title,
      amount,
      category,
    });

    const saved = await newBudget.save();
    res.json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Update a budget (PUT)
router.put('/:id', auth, async (req, res) => {
  const { title, amount, category } = req.body;
  try {
    let budget = await Budget.findById(req.params.id);
    if(!budget) return res.status(404).json({ message: 'Budget not found' });
    if(budget.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    budget.title = title || budget.title;
    budget.amount = amount || budget.amount;
    budget.category = category || budget.category;

    await budget.save();
    res.json(budget);
  } catch(err) {
    res.status(500).send('Server error');
  }
});

// Delete a budget
router.delete('/:id', auth, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    if (budget.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    await budget.deleteOne(); // or budget.remove()
    res.json({ message: 'Budget removed' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
