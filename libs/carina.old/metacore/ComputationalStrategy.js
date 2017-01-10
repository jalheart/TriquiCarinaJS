System.register(['./Strategy'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Strategy_1;
    var ComputationalStrategy;
    return {
        setters:[
            function (Strategy_1_1) {
                Strategy_1 = Strategy_1_1;
            }],
        execute: function() {
            ComputationalStrategy = class ComputationalStrategy extends Strategy_1.Strategy {
            };
            exports_1("ComputationalStrategy", ComputationalStrategy);
        }
    }
});
