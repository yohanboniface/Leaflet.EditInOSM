# Leaflet.EditInOSM

This simple control provide link to edit the map current view in the OSM editors.

Check out the [demo](http://yohanboniface.github.com/Leaflet.EditInOSM/).

To see some of the newer features, clone this repo and navigate to `examples/` folder in your browser.

Out-of-the-box supporter editors:
- JOSM
- iD
- Potlatch 2

## Quickstart

Add the js and css script tags to your project after leaflet:
```html
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5/leaflet.css" />
<script src="http://cdn.leafletjs.com/leaflet-0.5/leaflet.js"></script>
<link rel="stylesheet" href="./Leaflet.EditInOSM.css" />
<script src="./Leaflet.EditInOSM.js"></script>

```

When you instantiate the Leaflet map, specify the `editInOSMControl: true` option:

```javascript
    var map = L.map('map', {
        editInOSMControl: true,
    }).setView([48.4, -4.4], 13);
```

## Control Configuration Options

| option                   | description                                                                                                                                                                                                                                         |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| position                 | standard for a Leaflet control. See the [Leaflet documentation](http://leafletjs.com/reference.html#control-positions).                                                                                                                             |
| zoomThreshold            | An integer representing the minimum zoom level for which this control is visible.                                                                                                                                                                   |
| anchorText               | The text that will appear in the hyperlink when using the `attributionBox` widget. Defaults to "Edit in OSM".                                                                                                                                       |
| titleText                | The HTML title text for this widget when the user hovers over it.                                                                                                                                                                                   |
|                          |                                                                                                                                                                                                                                                     |
| widget                   | The UI widget that will appear for this control. Can be `attributionBox` or `multiButton`. See widgets section for more details.                                                                                                                    |
| editor                   | A single editor to feature in the widget. Always takes precendence over visibleEditors.                                                                                                                                                             |
| visibleEditors           | An array of editor names to determine which editors will appear in the UI widget. Must be the names of built-in editors or editors supplied via the `additionalEditors` option. The `attributionBox` widget will only use the first visible editor. |
| additionalEditors        | an object with additional editor names as keys and editor objects as values. See the Editors section for more details.                                                                                                                              |
| overrideDefaultEditors   | an object to be mixed in that will override values for the default editors. See example below.                                                                                                                                      |

## Widgets

The EditInOSM control supports two types of UI widgets, each with different goals.

##### multiButton
A box icon that reveals selectable options when the user hovers over it. This is perfect for situations where you expect the majority of your users to be enthusiastic about contributing to OpenStreetMap and you want to make it as easy as possible.
##### attributionBox
A small hyperlink, styled like an attribution box typically found in the bottom-right of a web map. This is great for situations in which your app makes use of OpenStreetMap and you want users to contribute back, but don't want to distract your user from the primary features of your application. Pairs great with a high zoom threshold.

## Overriding the URL of an existing editor

In `editInOSMControlOptions` key in the map options, provide the `overrideDefaultEditors` option with the desired overrides.

example:
```javascript
var map = L.Map('map', {
    editInOSMControl: true,
    editInOSMControlOptions: {
        overrideDefaultEditors: {
            id: { url: "http://www.example.com" }
        }
    }
});
```

## Adding additional editors

In `editInOSMControlOptions` key in the map options, provide the `additionalEditors` option with the necessary attributes. See the built-in editors source code for more detail. Also, override the `visibleEditors` option to include the desired editors.

example:
```javascript
var map = L.Map('map', {
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
```

## Other customizations

see the `examples/` folder for examples.
