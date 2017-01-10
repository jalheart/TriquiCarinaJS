System.register(["../../../libs/carina/memory/WorkingMemory", "../../../libs/carina/objectlevel/ReasoningTask", "../models/TriquiModelOfTheWorld", "../computationalstrategies/RandomAlgorithmStrategy", "../computationalstrategies/MiniMaxAlgorithmStrategy"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WorkingMemory_1, ReasoningTask_1, TriquiModelOfTheWorld_1, RandomAlgorithmStrategy_1, MiniMaxAlgorithmStrategy_1, MachinePlays;
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
            },
            function (RandomAlgorithmStrategy_1_1) {
                RandomAlgorithmStrategy_1 = RandomAlgorithmStrategy_1_1;
            },
            function (MiniMaxAlgorithmStrategy_1_1) {
                MiniMaxAlgorithmStrategy_1 = MiniMaxAlgorithmStrategy_1_1;
            }
        ],
        execute: function () {
            MachinePlays = class MachinePlays extends ReasoningTask_1.ReasoningTask {
                run() {
                    return new Promise((resolve) => {
                        WorkingMemory_1.WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld_1.TriquiModelOfTheWorld).then((modelOfTheWorld) => {
                            var triquiModelOfTheWorld = modelOfTheWorld;
                            //TODO Vamos a incluir metacognición
                            var rStrategy = new RandomAlgorithmStrategy_1.RandomAlgorithmStrategy(triquiModelOfTheWorld.board.cells);
                            var mmStrategy = new MiniMaxAlgorithmStrategy_1.MiniMaxAlgorithmStrategy(triquiModelOfTheWorld.board.cells, triquiModelOfTheWorld.playerToken, triquiModelOfTheWorld.machineToken);
                            //                var position: number[]    =mmStrategy.run();                
                            var position = rStrategy.run();
                            triquiModelOfTheWorld.board.setData(position[0], position[1], triquiModelOfTheWorld.currentToken);
                            WorkingMemory_1.WorkingMemory.instance.syncModelOfTheWorld(triquiModelOfTheWorld).then((resultSMOTW) => {
                                WorkingMemory_1.WorkingMemory.instance.updateMentalState("is_machine_played", true).then((resultUMS) => {
                                    resolve(true);
                                });
                            });
                        });
                    });
                }
            };
            exports_1("MachinePlays", MachinePlays);
        }
    };
});
