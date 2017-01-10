System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MemoryDriver;
    return {
        setters:[],
        execute: function() {
            MemoryDriver = class MemoryDriver {
                constructor(config) {
                    this.config = config;
                }
                get config() {
                    return this._config;
                }
                set config(config) {
                    this._config = config;
                }
            };
            exports_1("MemoryDriver", MemoryDriver);
        }
    }
});
