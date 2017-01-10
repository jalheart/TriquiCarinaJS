System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RootElement;
    return {
        setters:[],
        execute: function() {
            RootElement = class RootElement {
                constructor() {
                }
                get name() {
                    return this._name;
                }
                set name(name) {
                    this._name = name;
                }
                get output() {
                    return this._output;
                }
                set output(output) {
                    this._output = output;
                }
            };
            exports_1("RootElement", RootElement);
        }
    }
});
