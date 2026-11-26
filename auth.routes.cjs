const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller.cjs');

// Endpoint login
router.post('/login', authController.login);

module.exports = router;