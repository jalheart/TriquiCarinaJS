System.register(["../../../libs/carina/objectlevel/ReasoningTask", "../../../libs/carina/memory/WorkingMemory", "../models/TriquiModelOfTheWorld"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ReasoningTask_1, WorkingMemory_1, TriquiModelOfTheWorld_1, VerifyWinner;
    return {
        setters: [
            function (ReasoningTask_1_1) {
                ReasoningTask_1 = ReasoningTask_1_1;
            },
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            },
            function (TriquiModelOfTheWorld_1_1) {
                TriquiModelOfTheWorld_1 = TriquiModelOfTheWorld_1_1;
            }
        ],
        execute: function () {
            VerifyWinner = class VerifyWinner extends ReasoningTask_1.ReasoningTask {
                /**
                 * @return Boolean Devuelve true si la tarea se ejecuta exitosamente
                 */
                run() {
                    return new Promise((resolve) => {
                        WorkingMemory_1.WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld_1.TriquiModelOfTheWorld).then((modelOfTheWorld) => {
                            var triquiModelOfTheWorld = modelOfTheWorld;
                            var stateName = triquiModelOfTheWorld.currentToken == triquiModelOfTheWorld.playerToken ? 'is_player_winner_verified' : 'is_machine_winner_verified';
                            var stateWin = triquiModelOfTheWorld.currentToken == triquiModelOfTheWorld.playerToken ? "player_wins" : "machine_wins";
                            var columns = this.transposition(triquiModelOfTheWorld.board.cells);
                            var temp = this.diagonal(triquiModelOfTheWorld.board.cells);
                            var diagonal = temp[0];
                            var cross = temp[1];
                            var i, countToken;
                            var winned = false;
                            WorkingMemory_1.WorkingMemory.instance.updateMentalState(stateName, true).then((resultUMS) => {
                                for (i = 0; i < 3; i++) {
                                    var row = triquiModelOfTheWorld.board.cells[i];
                                    countToken = this.tell(row, triquiModelOfTheWorld.currentToken);
                                    if (countToken == 3) {
                                        this.updateTaskState(true, true, true);
                                        winned = true;
                                    }
                                }
                                for (i = 0; i < 3; i++) {
                                    var column = columns[i];
                                    countToken = this.tell(column, triquiModelOfTheWorld.currentToken);
                                    if (countToken == 3) {
                                        this.updateTaskState(true, true, true);
                                        winned = true;
                                    }
                                }
                                var count_d = this.tell(diagonal, triquiModelOfTheWorld.currentToken);
                                var count_t = this.tell(cross, triquiModelOfTheWorld.currentToken);
                                if (count_d == 3 || count_t == 3) {
                                    this.updateTaskState(true, true, true);
                                    winned = true;
                                }
                                if (winned) {
                                    WorkingMemory_1.WorkingMemory.instance.updateMentalState(stateWin, true).then((resultUMS) => {
                                        resolve(true);
                                    });
                                }
                                else {
                                    this.updateTaskState(true, true, false);
                                    resolve(true);
                                }
                            });
                        });
                    });
                }
                transposition(cells) {
                    var temp = [['', '', ''], ['', '', ''], ['', '', '']];
                    for (let i = 0; i < 3; i++) {
                        for (let j = 0; j < 3; j++) {
                            temp[j][i] = cells[i][j];
                        }
                    }
                    return temp;
                }
                diagonal(cells) {
                    var temps = [['', '', ''], ['', '', ''], ['', '', '']];
                    for (let i = 0; i < 3; i++) {
                        temps[0][i] = cells[i][i];
                        temps[1][i] = cells[i][2 - i];
                    }
                    return temps;
                }
                tell(cells, token) {
                    var temp = 0;
                    for (let i = 0; i < 3; i++) {
                        if (cells[i] != null && cells[i] === token)
                            temp++;
                    }
                    return temp;
                }
            };
            exports_1("VerifyWinner", VerifyWinner);
        }
    };
});
