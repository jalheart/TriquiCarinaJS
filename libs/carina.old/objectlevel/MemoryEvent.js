System.register(['../metacore/Event'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Event_1;
    var MemoryEvent;
    return {
        setters:[
            function (Event_1_1) {
                Event_1 = Event_1_1;
            }],
        execute: function() {
            MemoryEvent = class MemoryEvent extends Event_1.Event {
            };
            exports_1("MemoryEvent", MemoryEvent);
        }
    }
});
