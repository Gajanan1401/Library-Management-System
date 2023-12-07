const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'Client')));

// Define a route for the root URL
app.get('/', (req, res) => {
  // Send the 'index.html' file from the 'client/html' directory
  res.sendFile(path.join(__dirname, 'HTML', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
