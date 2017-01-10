System.register(['../memory/WorkingMemory'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WorkingMemory_1;
    var ModelOfTheWorld;
    return {
        setters:[
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            }],
        execute: function() {
            ModelOfTheWorld = class ModelOfTheWorld {
                constructor() {
                    this._isCreated = false;
                }
                get mission() {
                    return this._mission;
                }
                set mission(mission) {
                    this._mission = mission;
                }
                getStateIsCreated() {
                    return new Promise((resolve, reject) => {
                        WorkingMemory_1.WorkingMemory.instance.retrieveInformation("is_created").then((result) => {
                            var isCreated = result;
                            resolve(isCreated != null ? isCreated.information : this._isCreated);
                        });
                    });
                }
                set stateIsCreated(isCreated) {
                    this._isCreated = isCreated;
                }
            };
            exports_1("ModelOfTheWorld", ModelOfTheWorld);
        }
    }
});
