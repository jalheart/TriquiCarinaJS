System.register(['./Element'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Element_1;
    var Goal;
    return {
        setters:[
            function (Element_1_1) {
                Element_1 = Element_1_1;
            }],
        execute: function() {
            Goal = class Goal extends Element_1.Element {
                set sourceState(state) {
                    this._sourceState = state;
                }
                get sourceState() {
                    return this._sourceState;
                }
                set targetState(state) {
                    this._targetState = state;
                }
                get targetState() {
                    return this._targetState;
                }
            };
            exports_1("Goal", Goal);
        }
    }
});
