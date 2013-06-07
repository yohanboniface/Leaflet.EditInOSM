L.Control.EditInOSM = L.Control.extend({

    /////////////////////////////
    // default objects
    /////////////////////////////

    widgets: {
        multiButton: {
            className: 'leaflet-control-edit-in-osm'
        },
        attributionBox: {
            className: 'leaflet-control-attribution'
        }
    },

    editors: {
        josm: {
            url: 'http://127.0.0.1:8111/load_and_zoom',
            timeout: 1000,
            displayName: "JOSM",
            buildURL: function (map) { 
                var bounds = map.getBounds();
                return this.url + L.Util.getParamString({
                    left: bounds.getNorthWest().lng,
                    right: bounds.getSouthEast().lng,
                    top: bounds.getNorthWest().lat,
                    bottom: bounds.getSouthEast().lat
                });
            }
        },
        id: {
            url: 'http://openstreetmap.us/iD/release/#map=',
            displayName: "iD",
            buildURL: function (map) { 
                return this.url + [
                    map.getZoom(),
                    map.getCenter().wrap().lng,
                    map.getCenter().wrap().lat
                ].join('/');
            }
        },
        potlatch: {
            url: 'http://open.mapquestapi.com/dataedit/index_flash.html',
            displayName: "P2",
            buildURL: function (map) { 
                return this.url + L.Util.getParamString({
                    lon: map.getCenter().wrap().lng,
                    lat: map.getCenter().wrap().lat,
                    zoom: map.getZoom()
                });
            }
        }
    },

    /////////////////////////////
    // config and validation
    /////////////////////////////

    options: {
        position: "topright",
        // the minimum zoom level for which this plugin is visible
        zoomThreshold: 0,
        widget: "multiButton",
        anchorText: "Edit in OSM",
        titleText: "Open this map extent in a map editor to provide more accurate data to OpenStreetMap",
        visibleEditors: ["id", "josm", "potlatch"],
        additionalEditors: {}
    },

    initialize: function (options) {
        options = options || {};
        L.setOptions(this, options);

        this._editors = L.Util.extend({}, this.editors, options.additionalEditors);
        // The plugin will work if the user provides an editor or a list of visible Editors,
        // giving preference to the individual editor over the list
        this._editor = this.options.editor || this.options.visibleEditors[0];
        this._visibleEditors = (this.options.editor ? [this.options.editor] : null) || this.options.visibleEditors;

        this._className = this.widgets[this.options.widget].className;
    },


    /////////////////////////////
    // framework methods
    /////////////////////////////

    onAdd: function (map) {
        this._map = map;
        this._map.on('zoomend', this._onZoomEnd, this);
        return this.render();
    },

    onRemove: function (map) {
        map.off('zoomend', this._onZoomEnd);
    },

    /////////////////////////////
    // UI methods
    /////////////////////////////

    render: function () {
        /*
         Build the UI widget for this plugin
         */
        var container = L.DomUtil.create('div', this._className),
            that = this;

        container.title = this.options.titleText || this.options.anchorText;

        // create a default placeholder icon
        L.DomUtil.create('a', "leaflet-control-edit-in-osm-toggle", container);

        // add clickable button for each editor
        // to be displayed on hover

        if (this.options.widget === "attributionBox") {
            this.addEditorToWidget(container, this._editors[this._editor], this.options.anchorText);
        } else if (this.options.widget === "multiButton") {
            for (var i in this._visibleEditors) {
                (function () {
                    var name = that._visibleEditors[i],
                        editor = that._editors[name];
                    that.addEditorToWidget(container, editor);
                }());
            }
        }
        return container;
    },

    addEditorToWidget: function (widgetContainer, editor, linkText) {
        var editorWidget = L.DomUtil.create('a', "osm-editor", widgetContainer);
        editorWidget.href = "#";
        editorWidget.innerHTML = linkText || editor.displayName;
        L.DomEvent
            .on(editorWidget, "click", L.DomEvent.stop)
            .on(editorWidget, "click", function (e) {
                this.openRemote(editor);
            }, this);
           
    },

    _onZoomEnd: function showOrHideUI() {
        /*
        Make the EditInOSM widget visible or invisible after each
        zoom event.
        
        configurable by setting the *zoomThreshold* option.
        */
        var zoom = this._map.getZoom();
        if (zoom < this.options.zoomThreshold) {
            L.DomUtil.addClass(this._container, "leaflet-control-edit-hidden");
        } else {
            L.DomUtil.removeClass(this._container, "leaflet-control-edit-hidden");
        }
    },

    /////////////////////////////
    // API methods
    /////////////////////////////

    openRemote: function (editor) {
        /*
         Takes an editor, calls their buildURL method
         and opens the url in the browser
         */
        var url = editor.buildURL(this._map),
            w = window.open(url);
        if (editor.timeout) {
            setTimeout(function() {w.close();}, editor.timeout);
        }
    }
});

/////////////////////////////
// initialization hook
/////////////////////////////

L.Map.addInitHook(function () {
    if (this.options.editInOSMControl) {
        var options = this.options.editInOSMControlOptions || {};
        this.editInOSMControl = (new L.Control.EditInOSM(options)).addTo(this);
    }
});
