System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Memory;
    return {
        setters:[],
        execute: function() {
            Memory = class Memory {
                constructor(driver) {
                    this._driver = null;
                    this._driver = driver;
                }
                storeInformation(information) {
                    return this.driver.storeInformation(information);
                }
                retrieveInformation(cue) {
                    return this.driver.retrieveInformation(cue);
                }
                forgetInformation(cue) {
                    this.driver.forgetInformation(cue);
                }
                get driver() {
                    return this._driver;
                }
                set driver(driver) {
                    this._driver = driver;
                }
            };
            exports_1("Memory", Memory);
        }
    }
});
