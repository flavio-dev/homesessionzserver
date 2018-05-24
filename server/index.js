const express = require('express');
const app = express();

// Priority serve any static files.
const PORT = Number(process.env.PORT || 4000);

// Answer API requests.
app.get('/users', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.send(JSON.stringify({
    test: 'hello world'
  }));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
