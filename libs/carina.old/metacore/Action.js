System.register(['./Task'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Task_1;
    var Action;
    return {
        setters:[
            function (Task_1_1) {
                Task_1 = Task_1_1;
            }],
        execute: function() {
            Action = class Action extends Task_1.Task {
            };
            exports_1("Action", Action);
        }
    }
});
