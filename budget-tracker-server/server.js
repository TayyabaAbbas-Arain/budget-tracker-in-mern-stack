require('dotenv').config(); // ✅ Loads .env first
console.log('MONGO_URI:', process.env.MONGO_URI); // ⬅️ Add this line to confirm
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
    console.log('✅ MongoDB Connected successfully!');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });
