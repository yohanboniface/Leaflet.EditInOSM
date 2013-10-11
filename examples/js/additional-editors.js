var id = new L.Control.EditInOSM.Editors.Id(),
    foo = { displayName: "Foo",
            url: "http://www.example.com",
            buildUrl: function (map) { return this.url; }
          },
    bar = { displayName: "Bar",
            url: "http://www.example.com",
            buildUrl: function (map) { return this.url + "/example.html"; }
          },
    map = L.map('map', { 
    editInOSMControlOptions: { editors: [id, foo, bar] }
    });

map.setView([48.4, -4.4], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
