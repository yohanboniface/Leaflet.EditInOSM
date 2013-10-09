var overriddenPotlatch = new L.Control.EditInOSM.Editors.Potlatch({
    url: "http://www.example.com",
    displayName: "POTLATCH" 
    }),
    map = L.map('map', { 
        editInOSMControlOptions: {
            editors: ['id', overriddenPotlatch ]
        }
    });

map.setView([48.4, -4.4], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
