const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { Pool } = require('pg');
const authRoutes = require('./src/routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
  connectionString: 'postgres://nurmuhamadyasin:Sul2104**@localhost:5432/propscape'
  // Replace with your actual PostgreSQL credentials
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
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
  const url = `http://localhost:3003/uploads/${req.file.filename}`;
  res.json({ url });
});

// --- Property Endpoints ---

// POST save property (with units)
app.post('/api/property', async (req, res) => {
  const {
    title,
    location,
    coordinates,
    price,
    details,
    listedDate,
    listedBy,
    listedByDesc,
    developerLogo,
    images,
    units
  } = req.body;

  try {
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
        images, // images is text[] in DB, pass as array
        JSON.stringify(units) // units is jsonb in DB, pass as string
      ]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save property' });
  }
});

// GET all properties (with units)
app.get('/api/property', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM property ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// GET all properties for Buy page (alias for /api/property)
app.get('/api/houses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM property ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// --- Banner Endpoints ---

// GET all banners for carousel
app.get('/api/banner', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM homepage_banner ORDER BY id DESC');
    res.json(result.rows); // <-- return array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch banners' });
  }
});

// POST save a new banner (only image_url and button_link)
app.post('/api/banner', async (req, res) => {
  // Accept either a single banner or an array of banners
  const banners = Array.isArray(req.body) ? req.body : [req.body];
  try {
    // Optional: clear all banners if you want to replace them
    // await pool.query('DELETE FROM homepage_banner');
    for (const banner of banners) {
      if (banner.image_url) {
        await pool.query(
          `INSERT INTO homepage_banner (image_url, button_link) VALUES ($1, $2)`,
          [banner.image_url, banner.button_link]
        );
      }
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save banner' });
  }
});

// DELETE a banner by id
app.delete('/api/banner/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM homepage_banner WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete banner' });
  }
});

// PUT update a banner by id
app.put('/api/banner/:id', async (req, res) => {
  const { image_url, button_link } = req.body;
  try {
    await pool.query(
      'UPDATE homepage_banner SET image_url = $1, button_link = $2 WHERE id = $3',
      [image_url, button_link, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update banner' });
  }
});

// --- Widget Endpoints ---

// GET latest widget data
app.get('/api/widgets', async (req, res) => {
  try {
    const result = await pool.query('SELECT data FROM widgets ORDER BY id DESC LIMIT 1');
    if (result.rows.length > 0) {
      res.json(result.rows[0].data);
    } else {
      res.json({});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch widgets' });
  }
});

// PUT save widget data (MERGE with previous)
app.put('/api/widgets', async (req, res) => {
  try {
    const newData = req.body;
    // Get the latest data
    const result = await pool.query('SELECT data FROM widgets ORDER BY id DESC LIMIT 1');
    const prevData = result.rows.length > 0 ? result.rows[0].data : {};
    // Merge previous and new data
    const merged = { ...prevData, ...newData };
    await pool.query('INSERT INTO widgets (data) VALUES ($1)', [merged]);
    res.json({ success: true, data: merged });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save widgets' });
  }
});

// Auth routes
app.use('/api/auth', authRoutes);

app.listen(3003, () => console.log('Server running on port 3003'));