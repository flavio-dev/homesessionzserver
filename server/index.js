const express = require('express');
const request = require('request');
const app = express();

// Priority serve any static files.
const PORT = Number(process.env.PORT || 4000);

// Answer API requests.
app.get('/users', function (req, res) {

  request('https://api.mixcloud.com/NetilRadio/calming-waves-wfrancesco/', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred and handle it
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    // res.send(JSON.stringify({
    //   test: 'hello world'
    // }));
    res.send(body)
  });

});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
