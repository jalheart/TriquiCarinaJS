System.register(['./RootElement'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RootElement_1;
    var Field;
    return {
        setters:[
            function (RootElement_1_1) {
                RootElement_1 = RootElement_1_1;
            }],
        execute: function() {
            Field = class Field extends RootElement_1.RootElement {
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
            exports_1("Field", Field);
        }
    }
});
