var potlatch = new L.Control.EditInOSM.Editors.Potlatch(),
    attributionBox = new L.Control.EditInOSM.Widgets.AttributionBox({ editor: potlatch }),
    map = L.map('map', {
    editInOSMControlOptions: { 
        widget: attributionBox,
        position: 'bottomleft'
    }
});

map.setView([48.4, -4.4], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
