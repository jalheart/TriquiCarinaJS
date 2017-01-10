System.register(['./Element'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Element_1;
    var Event;
    return {
        setters:[
            function (Element_1_1) {
                Element_1 = Element_1_1;
            }],
        execute: function() {
            Event = class Event extends Element_1.Element {
                constructor(name) {
                    super();
                    this.name = name;
                }
            };
            exports_1("Event", Event);
        }
    }
});
