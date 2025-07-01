const express = require('express');
const router = express.Router();
const pool = require('../db'); // Adjust the path if your db.js is elsewhere

// Get the latest banner
router.get('/banner', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM homepage_banner ORDER BY id DESC LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch banner' });
  }
});

// Save/update the banner
router.post('/banner', async (req, res) => {
  const { image_url, headline, subheadline, button_text, button_link } = req.body;
  try {
    await pool.query(
      `INSERT INTO homepage_banner (image_url, headline, subheadline, button_text, button_link)
       VALUES ($1, $2, $3, $4, $5)`,
      [image_url, headline, subheadline, button_text, button_link]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save banner' });
  }
});

module.exports = router;