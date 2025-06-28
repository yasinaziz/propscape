import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/auth';
import marketingRoutes from './src/routes/marketing';

const app = express(); // <-- Move this up!

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/marketing', marketingRoutes);

// Optional: Default route for health check
app.get('/', (_req, res) => {
  res.send('API is running');
});

// Error handling middleware (optional)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});