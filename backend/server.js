require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const roleRoutes = require('./routes/roleRoutes');
const connectDB = require('./DB/index.js');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB()

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
