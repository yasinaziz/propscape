const express = require('express');
const router = express.Router();

// Dummy login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Replace with real authentication logic
  if (username === 'admin' && password === 'password') {
    res.json({ token: 'fake-jwt-token', user: { username } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Dummy register endpoint
router.post('/register', (req, res) => {
  // Replace with real registration logic
  res.status(201).json({ message: 'User registered' });
});

module.exports = router;