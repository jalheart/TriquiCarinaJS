System.register(['../metacore/Event'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Event_1;
    var ReasoningEvent;
    return {
        setters:[
            function (Event_1_1) {
                Event_1 = Event_1_1;
            }],
        execute: function() {
            ReasoningEvent = class ReasoningEvent extends Event_1.Event {
                get profile() {
                    return this._profile;
                }
                set profile(profile) {
                    this._profile = profile;
                }
            };
            exports_1("ReasoningEvent", ReasoningEvent);
        }
    }
});
