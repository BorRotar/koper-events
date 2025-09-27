// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Pool } = require('pg');
const Sequelize = require('sequelize');

// Create an instance of an Express app
const app = express();
require('dotenv').config()
// Set the port for the server
const PORT = process.env.PORT || 3000;

// Base URL for SWAPI
const SWAPI_BASE_URL = 'https://swapi.dev/api';

// Middleware to parse JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Routes
const swapiRouter = express.Router();
const sqlRouter = express.Router();

// Route to fetch data from SWAPI
swapiRouter.get('/:resource/:id', async (req, res) => {
  const { resource, id } = req.params;
  try {
    const response = await axios.get(`${SWAPI_BASE_URL}/${resource}/`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      message: 'Error fetching data from SWAPI',
      error: error.message,
      details: error.response ? error.response.data : 'No additional error information'
    });
  }
});

// Set up your database connection
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

// Sequelize setup
const sequelize = new Sequelize('postgres', 'postgres', 'testpassword', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

// Route to fetch data from SQL
app.get('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const queryResponse = await pool.query('SELECT * FROM Items WHERE id = $1', [id]);
    const item = queryResponse.rows[0];

    // Replace the binary image data with the base64 string
    // item.image = Buffer.from(item.image).toString('base64');

    res.json(item);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Error fetching data from Items',
      error: error.message,
    });
  }
});

// Use routers
app.use('/api', swapiRouter);
app.use('/sql', sqlRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
