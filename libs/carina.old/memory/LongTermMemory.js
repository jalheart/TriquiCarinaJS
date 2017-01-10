System.register(['./Memory'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Memory_1;
    var LongTermMemory;
    return {
        setters:[
            function (Memory_1_1) {
                Memory_1 = Memory_1_1;
            }],
        execute: function() {
            LongTermMemory = class LongTermMemory extends Memory_1.Memory {
                constructor(driver) {
                    super(driver);
                }
                static init(driver) {
                    if (this._instance == null) {
                        this._instance = new LongTermMemory(driver);
                    }
                }
                static get instance() {
                    return this._instance;
                }
            };
            LongTermMemory._instance = null;
            exports_1("LongTermMemory", LongTermMemory);
        }
    }
});
