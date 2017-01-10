System.register(["../../../libs/carina/memory/WorkingMemory", "../../../libs/carina/objectlevel/ReasoningTask", "../models/TriquiModelOfTheWorld"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WorkingMemory_1, ReasoningTask_1, TriquiModelOfTheWorld_1, ModifyBoard;
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
            ModifyBoard = class ModifyBoard extends ReasoningTask_1.ReasoningTask {
                /**
                 * @return Boolean Devuelve true si la tarea se ejecuta exitosamente
                 */
                run() {
                    return new Promise((resolve) => {
                        WorkingMemory_1.WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld_1.TriquiModelOfTheWorld).then((modelOfTheWorld) => {
                            var triquiModelOfTheWorld = modelOfTheWorld;
                            var cells = modelOfTheWorld.board.cells;
                            WorkingMemory_1.WorkingMemory.instance.getBCPU().then((bcpu) => {
                                var positionTmp = bcpu.getInput('player_move').information;
                                var position = positionTmp.split("_");
                                triquiModelOfTheWorld.board.setData(+position[0], +position[1], triquiModelOfTheWorld.currentToken);
                                triquiModelOfTheWorld.updateModelOfTheWorld().then((updated) => {
                                    WorkingMemory_1.WorkingMemory.instance.syncModelOfTheWorld(triquiModelOfTheWorld).then((resultUMOTW) => {
                                        this._executed = true;
                                        this._successful = true;
                                        this._stopPlan = false;
                                        WorkingMemory_1.WorkingMemory.instance.updateMentalState("is_board_modified", true).then((resultUMS) => {
                                            WorkingMemory_1.WorkingMemory.instance.updateMentalState("is_player_played", true).then((resultUMS) => {
                                                resolve(true);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
            };
            exports_1("ModifyBoard", ModifyBoard);
        }
    };
});
