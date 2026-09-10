const express = require('express');
const greeting = require('./greeting');

const app = express();
const port = 8080;

app.get('/', greeting);

// Start the server only when this file is run directly.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
}
module.exports = app;
