System.register(['./Memory'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Memory_1;
    var SensorMemory;
    return {
        setters:[
            function (Memory_1_1) {
                Memory_1 = Memory_1_1;
            }],
        execute: function() {
            SensorMemory = class SensorMemory extends Memory_1.Memory {
                constructor(driver) {
                    super(driver);
                }
                static init(driver) {
                    if (this._instance == null) {
                        this._instance = new SensorMemory(driver);
                    }
                }
                static get instance() {
                    return this._instance;
                }
            };
            exports_1("SensorMemory", SensorMemory);
        }
    }
});
