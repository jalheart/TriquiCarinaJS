System.register(['./Element'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Element_1;
    var CognitiveFunction;
    return {
        setters:[
            function (Element_1_1) {
                Element_1 = Element_1_1;
            }],
        execute: function() {
            CognitiveFunction = class CognitiveFunction extends Element_1.Element {
            };
            exports_1("CognitiveFunction", CognitiveFunction);
        }
    }
});
