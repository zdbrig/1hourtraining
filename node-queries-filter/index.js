const express = require('express');
const axios = require('axios');
const rateLimit = require("express-rate-limit");

const app = express();

// Set up rate limiting to allow 3 requests per 10 seconds
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 3,
  message: "Too many requests, please try again later"
});

// Endpoint to retrieve articles
app.get("/articles", limiter, async (req, res) => {
  try {
    // Make a request to the underlying microservice
    const response = await axios.get('http://article-auth:3000/articles' , 
    { headers: { Authorization: req.headers.authorization } });
    
    // Return the data from the underlying microservice
    res.json(response.data);
  } catch (error) {
    res.status(500).json({error: "Could not retrieve articles"});
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Facade microservice started on port 3000");
});
