System.register(["../../../libs/carina/memory/WorkingMemory", "../../../libs/carina/objectlevel/ReasoningTask", "../../../libs/carina/metacore/State", "../models/TriquiModelOfTheWorld", "../models/Board"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WorkingMemory_1, ReasoningTask_1, State_1, TriquiModelOfTheWorld_1, Board_1, ResetBoard;
    return {
        setters: [
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            },
            function (ReasoningTask_1_1) {
                ReasoningTask_1 = ReasoningTask_1_1;
            },
            function (State_1_1) {
                State_1 = State_1_1;
            },
            function (TriquiModelOfTheWorld_1_1) {
                TriquiModelOfTheWorld_1 = TriquiModelOfTheWorld_1_1;
            },
            function (Board_1_1) {
                Board_1 = Board_1_1;
            }
        ],
        execute: function () {
            ResetBoard = class ResetBoard extends ReasoningTask_1.ReasoningTask {
                run() {
                    return new Promise((resolve) => {
                        WorkingMemory_1.WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld_1.TriquiModelOfTheWorld).then((modelOfTheWorld) => {
                            var triquiModelOfTheWorld = modelOfTheWorld;
                            triquiModelOfTheWorld.board = new Board_1.Board();
                            triquiModelOfTheWorld.board.create(3, 3);
                            WorkingMemory_1.WorkingMemory.instance.syncModelOfTheWorld(triquiModelOfTheWorld).then((resultSMOTW) => {
                                var mentalStates = [];
                                mentalStates.push(new State_1.State("is_system_started", true));
                                mentalStates.push(new State_1.State("is_board_modified", true));
                                mentalStates.push(new State_1.State("player_wins", false));
                                mentalStates.push(new State_1.State("machine_wins", false));
                                mentalStates.push(new State_1.State("is_player_played", false));
                                mentalStates.push(new State_1.State("is_machine_played", false));
                                mentalStates.push(new State_1.State("is_machine_winner_verified", false));
                                mentalStates.push(new State_1.State("is_machine_turn_changed", false));
                                mentalStates.push(new State_1.State("is_player_turn_changed", false));
                                mentalStates.push(new State_1.State("is_player_winner_verified", false));
                                WorkingMemory_1.WorkingMemory.instance.setMentalStates(mentalStates).then((resultUMS) => {
                                    resolve(true);
                                });
                            });
                        });
                    });
                }
            };
            exports_1("ResetBoard", ResetBoard);
        }
    };
});
