"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const pg_1 = require("pg");
//import biddingRoutes from './routes/biddingRoutes';
//import housesRouter from './routes/houses';
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// PostgreSQL pool setup
const pool = new pg_1.Pool({
    user: 'nurmuhamadyasin',
    host: 'localhost',
    database: 'propscape',
    password: 'Sul2104**',
    port: 5432,
});
// Ensure uploads directory exists
const uploadsDir = path_1.default.join(__dirname, '../../uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir);
}
// Multer storage config
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
// Serve static files from uploads
app.use('/uploads', express_1.default.static(uploadsDir));
// Image upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file)
        return res.status(400).json({ error: 'No file uploaded' });
    const url = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ url });
});
// Get latest widget data from DB
app.get('/api/widgets', async (req, res) => {
    var _a;
    try {
        const result = await pool.query('SELECT data FROM widgets ORDER BY id DESC LIMIT 1');
        res.json(((_a = result.rows[0]) === null || _a === void 0 ? void 0 : _a.data) || {});
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch widgets' });
    }
});
// Save new widget data to DB
app.put('/api/widgets', async (req, res) => {
    try {
        const data = req.body;
        await pool.query('INSERT INTO widgets (data) VALUES ($1)', [data]);
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to save widgets' });
    }
});
// --- Property endpoints ---
// Save a new property
app.post('/api/property', async (req, res) => {
    try {
        const { title, location, coordinates, price, details, listedDate, listedBy, listedByDesc, developerLogo, images, units } = req.body;
        await pool.query(`INSERT INTO property
        (title, location, coordinates, price, details, listed_date, listed_by, listed_by_desc, developer_logo, images, units)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`, [
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
            JSON.stringify(units) // <-- pass as JS object/array, not stringified!
        ]);
        res.json({ success: true });
    }
    catch (err) {
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
    }
    catch (err) {
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
