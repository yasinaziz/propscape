import express from 'express';
import biddingRoutes from './routes/biddingRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', biddingRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the House Bidding System PropScape!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
