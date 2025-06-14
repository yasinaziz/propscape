const express = require('express');
const app = express();
const housesRouter = require('./routes/houses');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/houses', housesRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});