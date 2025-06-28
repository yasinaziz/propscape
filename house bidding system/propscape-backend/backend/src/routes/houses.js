const express = require('express');
const router = express.Router();

// Example in-memory data
let houses = [
  {
    id: 1,
    title: 'Modern Villa',
    location: 'Downtown',
    price: 500000,
    details: 'A beautiful modern villa.',
    units: [{ price: 500000, beds: 4, baths: 3, size: '2500 sqft' }],
    listedBy: 'Owner',
  }
];

// Get all houses
router.get('/', (req, res) => {
  res.json(houses);
});

// Add a new house
router.post('/', (req, res) => {
  const house = { ...req.body, id: houses.length + 1 };
  houses.push(house);
  res.status(201).json(house);
});

// Get a single house
router.get('/:id', (req, res) => {
  const house = houses.find(h => h.id === Number(req.params.id));
  if (!house) return res.status(404).json({ error: 'Not found' });
  res.json(house);
});

// Update a house
router.put('/:id', (req, res) => {
  const idx = houses.findIndex(h => h.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  houses[idx] = { ...houses[idx], ...req.body };
  res.json(houses[idx]);
});

// Delete a house
router.delete('/:id', (req, res) => {
  houses = houses.filter(h => h.id !== Number(req.params.id));
  res.status(204).end();
});

module.exports = router;