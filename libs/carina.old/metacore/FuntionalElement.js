System.register(['./RootElement'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RootElement_1;
    var FuntionalElement;
    return {
        setters:[
            function (RootElement_1_1) {
                RootElement_1 = RootElement_1_1;
            }],
        execute: function() {
            FuntionalElement = class FuntionalElement extends RootElement_1.RootElement {
                constructor() {
                    super();
                }
                set effect(effect) {
                    this._effect = effect;
                }
                get effect() {
                    return this._effect;
                }
                set precodition(precodition) {
                    this._precodition = precodition;
                }
                get precodition() {
                    return this._precodition;
                }
            };
            exports_1("FuntionalElement", FuntionalElement);
        }
    }
});
