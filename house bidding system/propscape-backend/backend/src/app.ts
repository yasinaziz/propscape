import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { Pool } from 'pg';
//import biddingRoutes from './routes/biddingRoutes';
//import housesRouter from './routes/houses';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;

app.use(cors());
app.use(express.json());

// PostgreSQL pool setup
const pool = new Pool({
  user: 'nurmuhamadyasin',
  host: 'localhost',
  database: 'propscape',
  password: 'Sul2104**',
  port: 5432,
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Serve static files from uploads
app.use('/uploads', express.static(uploadsDir));

// Image upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ url });
});

// Get latest widget data from DB
app.get('/api/widgets', async (req, res) => {
  try {
    const result = await pool.query('SELECT data FROM widgets ORDER BY id DESC LIMIT 1');
    res.json(result.rows[0]?.data || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch widgets' });
  }
});

// Save new widget data to DB
app.put('/api/widgets', async (req, res) => {
  try {
    const data = req.body;
    await pool.query('INSERT INTO widgets (data) VALUES ($1)', [data]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save widgets' });
  }
});

// --- Property endpoints ---

// Save a new property
app.post('/api/property', async (req, res) => {
  try {
    const {
      title, location, coordinates, price, details, listedDate,
      listedBy, listedByDesc, developerLogo, images, units
    } = req.body;

    await pool.query(
      `INSERT INTO property
        (title, location, coordinates, price, details, listed_date, listed_by, listed_by_desc, developer_logo, images, units)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [
        title,
        location,
        coordinates,
        price,
        details,
        listedDate,
        listedBy,
        listedByDesc,
        developerLogo,
        images, // <-- fix here
    JSON.stringify(units)// <-- pass as JS object/array, not stringified!
      ]
    );
    res.json({ success: true });
  } catch (err: any) {
    // Print the full error object for debugging
    console.error('Error saving property:', err);
    res.status(500).json({ error: err.message || 'Failed to save property' });
  }
});

// Get all properties
app.get('/api/property', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM property ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// Mount both routers under /api
//app.use('/api/bids', biddingRoutes);
//app.use('/api/houses', housesRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the House Bidding System PropScape!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});