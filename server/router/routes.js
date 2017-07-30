// get dependencies
const request = require('request');
const routes = require('express').Router();
const path = require('path');

// set root for content
const root = '/../../site/';

// get configuration
const nconf = require('nconf');
nconf.file({file: 'server/config/config.json'});
const googleKeys = nconf.get('googleApi');

// routes

// default route - returns index.html
routes.get('/', (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname + root + 'index.html'));
});

// about route - returns about.html
routes.get('/about', (req, res) => {
    res.status(200).sendFile(path.join(__dirname + root + 'about.html'));
});

// help route - returns help.html
routes.get('/help', (req, res) => {
    res.status(200).sendFile(path.join(__dirname + root + 'help.html'));
});

// proxy call for google maps
routes.get('/googlemaps', (req, res) => {
    let googleMaps = "https://maps.googleapis.com/maps/api/js?key=" + googleKeys.mapKey + "&libraries=visualization&callback=initMap";
    
    request(googleMaps).pipe(res);
});

// proxy call for flutrack
routes.get('/search/:term', (req, res) => {
    let limit    = 100, // max results
        time     = 7,   // days
        fluTrack = "http://api.flutrack.org/?s=" + encodeURIComponent(req.params.term) + "&time=" + time + "&limit=" + limit;
    
    request(fluTrack).pipe(res);
});

module.exports = routes;