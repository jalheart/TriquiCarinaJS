System.register(["../../../libs/carina/memory/WorkingMemory", "../../../libs/carina/objectlevel/ReasoningTask", "../models/TriquiModelOfTheWorld"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WorkingMemory_1, ReasoningTask_1, TriquiModelOfTheWorld_1, ChangeTurn;
    return {
        setters: [
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            },
            function (ReasoningTask_1_1) {
                ReasoningTask_1 = ReasoningTask_1_1;
            },
            function (TriquiModelOfTheWorld_1_1) {
                TriquiModelOfTheWorld_1 = TriquiModelOfTheWorld_1_1;
            }
        ],
        execute: function () {
            ChangeTurn = class ChangeTurn extends ReasoningTask_1.ReasoningTask {
                run() {
                    return new Promise((resolve) => {
                        WorkingMemory_1.WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld_1.TriquiModelOfTheWorld).then((modelOfTheWorld) => {
                            var triquiModelOfTheWorld = modelOfTheWorld;
                            var stateName = triquiModelOfTheWorld.currentToken == triquiModelOfTheWorld.playerToken ? "is_player_turn_changed" : "is_machine_turn_changed";
                            triquiModelOfTheWorld.changeTurn();
                            WorkingMemory_1.WorkingMemory.instance.updateMentalState(stateName, true).then((resultUMS) => {
                                WorkingMemory_1.WorkingMemory.instance.syncModelOfTheWorld(triquiModelOfTheWorld);
                                resolve(true);
                            });
                        });
                    });
                }
            };
            exports_1("ChangeTurn", ChangeTurn);
        }
    };
});
