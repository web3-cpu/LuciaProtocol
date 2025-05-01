const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, 'build')));

// Other server routes and logic

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});