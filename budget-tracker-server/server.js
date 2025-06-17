// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Make sure these paths are correct
const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budgets');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // Use the imported authRoutes
app.use('/api/budgets', budgetRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected successfully!'); // Confirmation message
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err); // More descriptive error
    process.exit(1); // Exit if DB connection fails
  });