describe("Options", function() {

    //////////////////////////////////////////
    // SETUP / TEARDOWN
    //////////////////////////////////////////
    //
    // create/destroy a dummy dom element
    // to act as a map canvas

    beforeEach(function () {
        var div = document.createElement("div");
        div.id = "map";
        document.body.appendChild(div);
    });

    afterEach(function () {
        var div = document.getElementById("map");
        document.body.removeChild(div);
    });

    //////////////////////////////////////////
    // TESTS
    //////////////////////////////////////////
    //
    // test that user specified options work
    // together harmoniously.

    it("Should be able to override the url on a default editor",
       function () {
           var overriddenId = new L.Control.EditInOSM.Editors.Id({ url: "www.example.com" }),
               map = L.map('map', {
                   editInOSMControlOptions: { editors: [overriddenId, 'potlatch'] }
               });
           expect(map.editInOSMControl.options.editors[0].url).toEqual("www.example.com");
           expect(map.editInOSMControl.options.editors[0].displayName).toEqual("iD");
       });

    it("Should be able to add an additional editor", function() {
           var map = L.map('map', {
               editInOSMControlOptions: {
                   editors: [{ url: "bar",
                               displayName: "buz",
                               buildUrl: function () { return this.url; }
                             }]
               }
           });
        expect(map.editInOSMControl.options.editors[0].url).toEqual("bar");
        expect(map.editInOSMControl.options.editors[0].displayName).toEqual("buz");
    });

    it("Should use defaults when neither editor nor visibleEditors are provided", function () {
        var map = L.map('map', {editInOSMControlOptions: {}});
        expect(map.editInOSMControl.options.editors[0].displayName).toEqual('iD');
        expect(map.editInOSMControl.options.editors[1].displayName).toEqual('JOSM');
    });
});
