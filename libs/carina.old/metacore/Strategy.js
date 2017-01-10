System.register(['./FuntionalElement'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FuntionalElement_1;
    var Strategy;
    return {
        setters:[
            function (FuntionalElement_1_1) {
                FuntionalElement_1 = FuntionalElement_1_1;
            }],
        execute: function() {
            Strategy = class Strategy extends FuntionalElement_1.FuntionalElement {
            };
            exports_1("Strategy", Strategy);
        }
    }
});
