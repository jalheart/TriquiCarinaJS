System.register(['./Element'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Element_1;
    var State;
    return {
        setters:[
            function (Element_1_1) {
                Element_1 = Element_1_1;
            }],
        execute: function() {
            State = class State extends Element_1.Element {
                constructor(name, value) {
                    super();
                    this.name = name;
                    this.value = value;
                }
                get value() {
                    return this._value;
                }
                set value(value) {
                    this._value = value;
                }
            };
            exports_1("State", State);
        }
    }
});
