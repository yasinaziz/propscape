const express = require('express');
const router = express.Router();

// Example marketing endpoint
router.get('/ads', (req, res) => {
  res.json([
    { id: 1, title: 'Summer Sale', content: 'Get 10% off on all properties!' },
    { id: 2, title: 'New Listings', content: 'Check out the latest properties.' }
  ]);
});

module.exports = router;