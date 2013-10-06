var map = L.map('map', { 
    editInOSMControl: true,
    editInOSMControlOptions: {
        additionalEditors: {
            foo: {
                displayName: "Foo",
                url: "http://www.example.com",
                buildURL: function (map) {
                    return this.url;
                }
            },
            bar: {
                displayName: "Bar",
                url: "http://www.example.com",
                buildURL: function (map) {
                    return this.url + "/example.html";
                }
            }
        },
        visibleEditors: ['id', 'foo', 'bar']
    }
});

map.setView([48.4, -4.4], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
