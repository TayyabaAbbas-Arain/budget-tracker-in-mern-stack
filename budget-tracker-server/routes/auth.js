const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import controller

// Register Route
router.post('/register', authController.register); // Use controller function

// Login Route
router.post('/login', authController.login); // Use controller function

module.exports = router;