L.Control.EditInOSM = L.Control.extend({

    options: {
        position: "topright",
        editors: {
            JOSM: {
                url: 'http://127.0.0.1:8111/load_and_zoom',
                timeout: 1000
            },
            iD: {
                url: 'http://geowiki.com/iD/#map='
            },
            potlatch: {
                url: 'http://open.mapquestapi.com/dataedit/index_flash.html',
                name: "P2"
            }
        }
    },

    initialize: function (options) {
        if (typeof options === "undefined") {
            options = {};
        }
        // Prevent from overriding all editors when changing options of one
        options.editors = L.Util.extend({}, this.options.editors, options.editors);
        L.setOptions(this, options);
    },

    onAdd: function (map) {
        this._map = map;
        var className = 'leaflet-control-edit-in-osm',
            container = L.DomUtil.create('div', className),
            self = this;
        for (var name in this.options.editors) {
            this.addItem(container, name);
        }
        var link = L.DomUtil.create('a', "leaflet-control-edit-in-osm-toggle", container);
        link.href = '#';
        link.title = "Edit in OSM";
        return container;
    },

    addItem: function (container, name) {
        var editor = this.options.editors[name];
        var link = L.DomUtil.create('a', "osm-editor", container);
        link.href = '#';
        link.innerHTML = editor.name || name;
        L.DomEvent
            .on(link, "click", L.DomEvent.stop)
            .on(link, "click", function (e) {
                this.openRemote(name);
            }, this);
    },

    openRemote: function (name) {
        var editor = this.options.editors[name];
        var w = window.open(this.buildURL(name));
        if (editor.timeout) {
            setTimeout(function() {w.close();}, editor.timeout);
        }
    },

    buildURL: function (name) {
        return this.options.editors[name].url + this["get_" + name + "_params"]();
    },

    getBounds: function () {
        // TODO transform if not SphericalMercator
        return this._map.getBounds();
    },

    get_JOSM_params: function () {
        var bounds = this.getBounds();
        return L.Util.getParamString({
                left: bounds.getNorthWest().lng,
                right: bounds.getSouthEast().lng,
                top: bounds.getNorthWest().lat,
                bottom: bounds.getSouthEast().lat
        });

    },

    get_potlatch_params: function () {
        return L.Util.getParamString({
                lon: this._map.getCenter().wrap().lng,
                lat: this._map.getCenter().wrap().lat,
                zoom: this._map.getZoom()
        });

    },

    get_iD_params: function () {
        return [
            this._map.getZoom(),
            this._map.getCenter().wrap().lat,
            this._map.getCenter().wrap().lng
        ].join('/');
    }

});
L.Map.addInitHook(function () {
    if (this.options.editInOSMControl) {
        var options = this.options.editInOSMControlOptions || {};
        this.editInOSMControl = (new L.Control.EditInOSM(options)).addTo(this);
    }
});
