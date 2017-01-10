System.register(['./CognitiveTask'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CognitiveTask_1;
    var ReasoningTask;
    return {
        setters:[
            function (CognitiveTask_1_1) {
                CognitiveTask_1 = CognitiveTask_1_1;
            }],
        execute: function() {
            ReasoningTask = class ReasoningTask extends CognitiveTask_1.CognitiveTask {
                buildProfile() {
                }
                run() {
                }
                get strategys() {
                    return this._strategys;
                }
                set strategys(strategys) {
                    this._strategys = strategys;
                }
                addStrategy(strategy) {
                    this._strategys.push(strategy);
                }
                getStrategy(pos) {
                    return pos < this._strategys.length ? this._strategys[pos] : null;
                }
            };
            exports_1("ReasoningTask", ReasoningTask);
        }
    }
});
