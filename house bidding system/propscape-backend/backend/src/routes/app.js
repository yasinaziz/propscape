const express = require('express');
const cors = require('cors');
const housesRouter = require('./houses');
const authRouter = require('./auth');
const marketingRouter = require('./marketing');
const bannerRouter = require('./banner'); // Banner router

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/houses', housesRouter);
app.use('/api/auth', authRouter);
app.use('/api/marketing', marketingRouter);
app.use('/api', bannerRouter); // Banner routes

// Health check
app.get('/', (_req, res) => {
  res.send('API is running');
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});