const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Use the houses route (all logic is in routes/houses.js)
const houseRoutes = require('./routes/houses');
app.use('/api/houses', houseRoutes);

const PORT = 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));