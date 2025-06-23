// filepath: /Users/nurmuhamadyasin/Desktop/propscape/backend/src/routes/biddingRoutes.ts
import { Router } from 'express';

const router = Router();

router.get('/houses', (req, res) => {
  res.json([
    {
      id: 1,
      title: "Sample House",
      description: "A beautiful house.",
      current_bid: 500000,
      image: "",
      location: "Kuala Lumpur",
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      type: "Condo"
    }
  ]);
});

export default router;