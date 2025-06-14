import { Router } from 'express';
import pool from '../backend/db'; // adjust path as needed

const router = Router();

// List all houses
router.get('/houses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM houses');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err });
  }
});

// Place a bid on a housepsql -U nurmuhamadyasin -h localhost
router.post('/houses/:id/bid', async (req, res) => {
  const { id } = req.params;
  const { userId, amount } = req.body;

  try {
    // Get current bid
    const houseResult = await pool.query('SELECT * FROM houses WHERE id = $1', [id]);
    if (houseResult.rows.length === 0) {
      return res.status(404).json({ message: 'House not found' });
    }
    const house = houseResult.rows[0];

    if (typeof amount !== 'number' || amount <= house.currentbid) {
      return res.status(400).json({ message: 'Bid must be higher than current bid' });
    }

    // Update current bid
    await pool.query('UPDATE houses SET currentbid = $1 WHERE id = $2', [amount, id]);

    // Optionally, insert bid into a bids table
    // await pool.query('INSERT INTO bids (house_id, user_id, amount, timestamp) VALUES ($1, $2, $3, NOW())', [id, userId, amount]);

    res.json({ message: 'Bid placed successfully', houseId: id, newBid: amount });
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err });
  }
});

export default router;