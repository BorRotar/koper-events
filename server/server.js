// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Create an instance of an Express app
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 3000;

// Base URL for SWAPI
const SWAPI_BASE_URL = 'https://swapi.dev/api';  // Ensure the URL is correct

// Middleware to parse JSON requests
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Route to fetch data from SWAPI
app.get('/api/:resource/:id', async (req, res) => {
  const { resource, id } = req.params;
  try {
    // Send request to SWAPI
    const response = await axios.get(`${SWAPI_BASE_URL}/${resource}/${id}`);

    // Log the full response from SWAPI
    console.log('SWAPI Response:', response.data);

    // Return data as JSON
    res.json(response.data);
  } catch (error) {
    console.error('Error caught:', error.message);  // Log any error that occurs in the process

    // Provide detailed error information if possible, otherwise a general error message
    res.status(error.response ? error.response.status : 500).json({
      message: 'Error fetching data from SWAPI',
      error: error.message,
      details: error.response ? error.response.data : 'No additional error information'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);  // Log which port the server is running on
});
