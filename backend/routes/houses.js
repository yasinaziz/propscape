const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'nurmuhamadyasin',
  host: 'localhost',
  database: 'propscape',
  password: '',
  port: 5432,
});

// GET all houses
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM houses');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single house by ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid house id' });
    const result = await pool.query('SELECT * FROM houses WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'House not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new house
router.post('/', async (req, res) => {
  const { title, description, current_bid, rental_bid, image, location, bedrooms, bathrooms, area, type } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO houses (title, description, current_bid, rental_bid, image, location, bedrooms, bathrooms, area, type)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [title, description, current_bid, rental_bid, image, location, bedrooms, bathrooms, area, type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all bids for a house (bidding history)
router.get('/:id/bids', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid house id' });
    const result = await pool.query(
      'SELECT amount, created_at FROM bids WHERE house_id = $1 ORDER BY created_at DESC',
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new bid for a house (bidding input)
router.post('/:id/bids', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const amount = Number(req.body.amount);
    if (isNaN(id) || isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid id or amount' });
    }
    // Insert the bid
    const bidResult = await pool.query(
      'INSERT INTO bids (house_id, amount) VALUES ($1, $2) RETURNING *',
      [id, amount]
    );
    // Update the house's current_bid
    await pool.query(
      'UPDATE houses SET current_bid = $1 WHERE id = $2',
      [amount, id]
    );
    res.status(201).json(bidResult.rows[0]);
  } catch (err) {
    console.error('Bid error:', err); // For debugging
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;