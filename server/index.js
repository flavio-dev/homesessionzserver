const express = require('express');
const request = require('request');
const app = express();

// Priority serve any static files.
const PORT = Number(process.env.PORT || 4000);

// Answer API requests.
app.get('/cloudcast/:user/:cloudcastKey/:embedJson*?', function (req, res) {
    if (req.headers.origin !== 'http://localhost:3000' && typeof(req.headers.origin) !== 'undefined') {
      res.status(400);
      res.send('None shall pass');
    } else {
        let url = 'https://api.mixcloud.com/' + req.params.user + '/' + req.params.cloudcastKey
        if (req.params.embedJson === 'embed-json') {
            url = url + '/embed-json'
        }
        request(encodeURI(url), function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            res.set('Content-Type', 'application/json');
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
            res.set('Access-Control-Allow-Headers', 'Content-Type');
            res.send(body)
        });
    }
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});
