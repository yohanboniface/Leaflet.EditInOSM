# Leaflet.EditInOSM

This simple control provide link to edit the map current view in the OSM editors.

Out-of-the-box supporter editors:
- JOSM
- iD
- Potlatch 2

## How to change the URL of some editor?

Add a `editInOSMControlOptions` key in the map options:

```
var map = L.Map('map', {
    editInOSMControlOptions: {
        iD: {
            url: "myurl"
        }
    }
})
```

## How to add a new editor?

Add it in the map options, like above, and provide a method to build the parameters, ex.:

```
L.Control.EditInOSM.include({
    get_{editorname}_params: function () {
        return [
            this.map.getZoom(),
            this.map.getCenter().wrap().lat,
            this.map.getCenter().wrap().lng
        ].join('/');
    }
})
```