// budget-tracker-server\controllers\budgetController.js

const Budget = require('../models/Budget');

exports.getBudgets = async (req, res) => {
  const budgets = await Budget.find({ userId: req.user.id });
  res.json(budgets);
};

exports.addBudget = async (req, res) => {
  const { title, amount, category } = req.body;
  const newBudget = new Budget({ title, amount, category, userId: req.user.id });
  await newBudget.save();
  res.status(201).json(newBudget);
};
