// Import required modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3006;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Use express-ejs-layouts middleware
app.use(expressLayouts);

// Set the directory for static assets
app.use(express.static('public'));

// Set the directory for views
app.set('views', __dirname + '/views');

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// include routes
const routerManager = require('./controllers/router-manager');
app.use(routerManager);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
