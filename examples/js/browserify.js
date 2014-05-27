var L = require('leaflet'),
    editInOSM = require('../../'),
    map = L.map('map', {editInOSMControlOptions: {}});
map.setView([48.4, -4.4], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
