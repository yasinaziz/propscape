import express from 'express';
import pool from '../db';

const router = express.Router();

// Get all houses
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM houses');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get a single house by ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid house ID' });
    }
    const result = await pool.query('SELECT * FROM houses WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'House not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;