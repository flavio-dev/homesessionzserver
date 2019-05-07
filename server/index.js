'use strict';
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const { JSDOM } = require('jsdom');
const app = express();

// Priority serve any static files.
const PORT = Number(process.env.PORT || 4000);

// Answer API requests.
// app.get('/cloudcast/extrainfo/:user/:cloudcastKey', function (req, res) {
//     if (
//       (req.headers.origin !== 'https://localhost:3000' &&
//       req.headers.origin !== 'https://www.homesessio.nz' &&
//       req.headers.origin !== 'https://homesessio.nz') ||
//       typeof(req.headers.origin) === 'undefined'
//     ) {
//       res.status(400);
//       res.send('None shall pass');
//     } else {
//         let url = 'https://www.mixcloud.com/' + req.params.user + '/' + req.params.cloudcastKey
//         request(encodeURI(url), function (error, response, body) {
//             console.log('error:', error); // Print the error if one occurred and handle it
//             console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//             let featuringArtistList = []
//             let previewUrl = ''
//
//             if (!error) {
//               const $ = cheerio.load(body);
//               const datas = $('#relay-data');
//               let dataWeNeed = [];
//               if (datas[0] && datas[0].children[0]) {
//                 dataWeNeed = JSON.parse(datas[0].children[0].data.replace(/&quot;/g,'"'));
//               }
//               // let sections = []
//               for (let data of dataWeNeed) {
//                 if(data.hasOwnProperty('cloudcast')) {
//                   try {
//                       var featuringArtistListTemp = data.cloudcast.data.cloudcastLookup.featuringArtistList;
//                       var previewUrlTemp = data.cloudcast.data.cloudcastLookup.previewUrl;
//                       // var sectionsTemp = data.cloudcast.data.cloudcastLookup.sections;
//                       // console.log('data.cloudcast.data.cloudcastLookup = ', data.cloudcast.data.cloudcastLookup);
//                   } catch ($error){
//
//                   }
//                   if(featuringArtistListTemp){
//                       featuringArtistList = featuringArtistListTemp;
//                   }
//
//                   if(previewUrlTemp){
//                       previewUrl = previewUrlTemp;
//                   }
//
//                   // if(sectionsTemp){
//                   //     sections = sectionsTemp;
//                   // }
//
//                   if (featuringArtistList.length && previewUrl.length) {
//                     break;
//                   }
//                 }
//               }
//             }
//
//             const returnedData = {
//               featuringArtistList,
//               previewUrl
//             }
//
//             res.set('Content-Type', 'application/json');
//             res.set('Access-Control-Allow-Origin', '*');
//             res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
//             res.set('Access-Control-Allow-Headers', 'Content-Type');
//             res.send(returnedData)
//         });
//     }
// });

app.get('/cloudcast/extrainfo/:user/:cloudcastKey', function (req, res) {
    if (
      (req.headers.origin !== 'https://localhost:3000' &&
      req.headers.origin !== 'https://www.homesessio.nz' &&
      req.headers.origin !== 'https://homesessio.nz') ||
      typeof(req.headers.origin) === 'undefined'
    ) {
      res.status(400);
      res.send('None shall pass');
    } else {
        let url = 'https://www.mixcloud.com/' + req.params.user + '/' + req.params.cloudcastKey
        request(encodeURI(url), function (error, response, body) {
            const options = {
              resources: 'usable',
              runScripts: 'dangerously',
            };
            console.log('error:', error); // Print the error if one occurred and handle it
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            let featuringArtistList = []
            let previewUrl = ''
            let sections = []

            if (!error) {
              // const { document } = (new JSDOM(body, options)).window;
              JSDOM.fromURL(url, options).then((dom)=>{
                  let dataWeNeed = [];
                  setTimeout(() => {
                      const datas = dom.window.document.querySelector('#relay-data');
                      dataWeNeed = JSON.parse(datas.innerHTML.replace(/&quot;/g,'"'));
                      for (let data of dataWeNeed) {
                        if(data.hasOwnProperty('cloudcast')) {
                          try {
                              var featuringArtistListTemp = data.cloudcast.data.cloudcastLookup.featuringArtistList;
                              var previewUrlTemp = data.cloudcast.data.cloudcastLookup.previewUrl;
                              var sectionsTemp = data.cloudcast.data.cloudcastLookup.sections;
                              // console.log("@@@ featuringArtistListTemp = ", featuringArtistListTemp);
                              // console.log("@@@ previewUrlTemp = ", previewUrlTemp);
                              if (sectionsTemp.length) {
                                console.log("@@@ sectionsTemp = ", sectionsTemp);
                              }
                              // console.log('data.cloudcast.data.cloudcastLookup = ', data.cloudcast.data.cloudcastLookup);
                          } catch ($error){

                          }
                        }
                      }
                  }, 10000);
                });
              }

            //   const datas = document.querySelector('#relay-data');
            //   console.log('#### datas.innerHTML = ', datas.innerHTML);
            //   let dataWeNeed = [];
            //   if (datas.innerHTML && datas.innerHTML.length) {
            //     dataWeNeed = JSON.parse(datas.innerHTML.replace(/&quot;/g,'"'));
            //   }
            //   console.log('####dataWeNeed = ', dataWeNeed);
            //   // let sections = []
            //   for (let data of dataWeNeed) {
            //     if(data.hasOwnProperty('cloudcast')) {
            //       try {
            //           var featuringArtistListTemp = data.cloudcast.data.cloudcastLookup.featuringArtistList;
            //           var previewUrlTemp = data.cloudcast.data.cloudcastLookup.previewUrl;
            //           var sectionsTemp = data.cloudcast.data.cloudcastLookup.sections;
            //           // console.log('data.cloudcast.data.cloudcastLookup = ', data.cloudcast.data.cloudcastLookup);
            //       } catch ($error){
            //
            //       }
            //       console.log('###### data.cloudcast.data.cloudcastLookup = ', data.cloudcast.data.cloudcastLookup);
            //       if(featuringArtistListTemp){
            //           featuringArtistList = featuringArtistListTemp;
            //       }
            //
            //       if(previewUrlTemp){
            //           previewUrl = previewUrlTemp;
            //       }
            //
            //       if(sectionsTemp){
            //           sections = sectionsTemp;
            //       }
            //
            //       if (featuringArtistList.length && previewUrl.length && sections.length) {
            //         break;
            //       }
            //     }
            //   }
            // }
            //
            // console.log('#### sections = ', sections);

            const returnedData = {
              featuringArtistList,
              previewUrl,
              sections
            }

            res.set('Content-Type', 'application/json');
            res.set('Access-Control-Allow-Origin', '*');
            res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
            res.set('Access-Control-Allow-Headers', 'Content-Type');
            res.send(returnedData)
        });
    }
});

app.get('/cloudcast/:user/:cloudcastKey/:embedJson*?', function (req, res) {
   console.log(req.headers.origin);
    if (
      (req.headers.origin !== 'https://localhost:3000' &&
      req.headers.origin !== 'https://www.homesessio.nz' &&
      req.headers.origin !== 'https://homesessio.nz') ||
      typeof(req.headers.origin) === 'undefined'
    ) {
      console.log('ARE WE GOING HERE??????');
      res.status(400);
      res.send('None shall pass');
    } else {
        let url = 'https://api.mixcloud.com/' + req.params.user + '/' + req.params.cloudcastKey
        if (req.params.embedJson === 'embed-json') {
            url = url + '/embed-json?height=60'
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
