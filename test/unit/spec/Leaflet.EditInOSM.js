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
           var map = L.map('map', {
               editInOSMControl: true,
               editInOSMControlOptions: {
                   overrideDefaultEditors: {
                       id: { url: "www.example.com" }
                   }
               }
           });
           expect(map.editInOSMControl._editors.id.url).toEqual("www.example.com");
           expect(map.editInOSMControl._editors.id.displayName).toEqual("iD");
       });

    it("Should be able to add an additional editor", function() {
           var map = L.map('map', {
               editInOSMControlOptions: {
                   additionalEditors: {
                       foo: { 
                           url: "bar",
                           displayName: "buz",
                           buildURL: function () { return this.url; }
                       }
                   }
               }
           });
        expect(map.editInOSMControl._editors.foo.url).toEqual("bar");
        expect(map.editInOSMControl._editors.foo.displayName).toEqual("buz");
    });

    it("Should give precedence to editor over visibleEditors", function () {
        var map = L.map('map', {
            editInOSMControlOptions: {
                editor: 'potlatch',
                visibleEditors: ['id', 'josm']
            }
        });
        expect(map.editInOSMControl._editor).toEqual('potlatch');
        expect(map.editInOSMControl._visibleEditors).toEqual(['potlatch']);
    });
    it("Should use defaults when neither editor nor visibleEditors are provided", function () {
        var map = L.map('map', {editInOSMControlOptions: {} });
        expect(map.editInOSMControl._editor).toEqual('id');
        expect(map.editInOSMControl._visibleEditors).toEqual(['id', 'potlatch']);

    });
});
