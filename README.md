# Leaflet.EditInOSM

This simple control provide link to edit the map current view in the OSM editors.

Check out the [demo](http://yohanboniface.github.com/Leaflet.EditInOSM/examples/basic.html).

To see some of the newer features, see the Examples section below.

Out-of-the-box supporter editors:
- iD
- Potlatch 2
- JOSM

## Quickstart

Add the js and css script tags to your project after leaflet:
```html
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6/leaflet.css" />
<script src="http://cdn.leafletjs.com/leaflet-0.6/leaflet.js"></script>
<link rel="stylesheet" href="./Leaflet.EditInOSM.css" />
<script src="./Leaflet.EditInOSM.js"></script>

```

When you instantiate the Leaflet map, specify the `editInOSMControlOptions` option to activate the control:

```javascript
    var map = L.map('map', {
        editInOSMControlOptions: {},
    });
```

## Control Configuration Options

| option                   | description                                                                                                                                                                                                                                         |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| position                 | standard for a Leaflet control. See the [Leaflet documentation](http://leafletjs.com/reference.html#control-positions).                                                                                                                             |
| zoomThreshold            | An integer representing the minimum zoom level for which this control is visible.                                                                                                                                                                   |
| widget                   | The UI widget that will appear for this control. Can be a string value of `attributionBox` or `multiButton`. Or, can be a configured instance of a class from `L.Control.EditInOSM.Widgets`. See examples for more details.                         |
| editors                  | An array of editors to determine which editors will appear in the UI widget. Can be string values of `id`, `potlatch` or `josm` for the built-in editors, or configured instances of `L.Control.EditInOSM.Editors`. See examples for more details.  |

## Widgets

The EditInOSM control supports two types of UI widgets, each with different goals.

##### multiButton
A box icon that reveals selectable options when the user hovers over it. This is perfect for situations where you expect the majority of your users to be enthusiastic about contributing to OpenStreetMap and you want to make it as easy as possible.
##### attributionBox
A small hyperlink, styled like an attribution box typically found in the bottom-right of a web map. This is great for situations in which your app makes use of OpenStreetMap and you want users to contribute back, but don't want to distract your user from the primary features of your application. Pairs great with a high zoom threshold.

## Overriding the URL of an existing editor

In `editInOSMControlOptions` key in the map options, provide the `editors` option with the desired overrides.

example:
```javascript
var overriddenId = new L.Control.EditInOSM.Editors.Id({ url: "http://www.example.com" }),
    map = L.Map('map', {
    editInOSMControlOptions: { editors: [overriddenId, 'potlatch'] }
});
```

## Adding additional editors

Provide an object to the `editors` option with the following properties:

| property    | description                                                                                    |
|-------------|------------------------------------------------------------------------------------------------|
| displayName | The name to appear on the button.                                                              |
| url         | The url prefix to pack a location onto                                                         |
| buildUrl    | a function that takes a base url and builds it into a location-aware url using the map object. |

example:
```javascript
var foo = { displayName: "Foo",
            url: "http://www.example.com",
            buildUrl: function (map) { return this.url; }
          },
    bar = { displayName: "Bar",
            url: "http://www.example.com",
            buildUrl: function (map) { return this.url + "/example.html"; }
          },
    map = L.map('map', { 
    editInOSMControlOptions: { editors: ['id', foo, bar] }
    });

```

## Other customizations

Check out some examples:

* [Basic](http://yohanboniface.github.com/Leaflet.EditInOSM/examples/basic.html)
* [Additional Editors](http://yohanboniface.github.com/Leaflet.EditInOSM/examples/additional-editors.html)
* [Attribution Box](http://yohanboniface.github.com/Leaflet.EditInOSM/examples/attribution-box.html)
* [Limiting Editors (1)](http://yohanboniface.github.com/Leaflet.EditInOSM/examples/limit-editors-1.html)
* [Limiting Editors (2)](http://yohanboniface.github.com/Leaflet.EditInOSM/examples/limit-editors-2.html)
* [Overriding Editors](http://yohanboniface.github.com/Leaflet.EditInOSM/examples/override-editors.html)
* [Zoom Threshold](http://yohanboniface.github.com/Leaflet.EditInOSM/examples/zoom-threshold.html)
