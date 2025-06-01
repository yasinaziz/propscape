import { Router } from 'express';
import { houses } from '../models/data';

const router = Router();

// List all houses
router.get('/houses', (req, res) => {
  res.json(houses);
});

// Place a bid on a house
router.post('/houses/:id/bid', (req, res) => {
  const { id } = req.params;
  const { userId, amount } = req.body;
  const house = houses.find(h => h.id === id);

  if (!house) {
    return res.status(404).json({ message: 'House not found' });
  }
  if (typeof amount !== 'number' || amount <= house.currentBid) {
    return res.status(400).json({ message: 'Bid must be higher than current bid' });
  }

  house.currentBid = amount;
  house.bids.push({ userId, amount, timestamp: new Date() });
  res.json({ message: 'Bid placed successfully', house });
});

export default router;