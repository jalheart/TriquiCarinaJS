System.register(["../../../libs/carina/metacore/ComputationalStrategy", "../../../libs/carina/memory/WorkingMemory", "../models/TriquiModelOfTheWorld"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ComputationalStrategy_1, WorkingMemory_1, TriquiModelOfTheWorld_1, CategorizationAlgorithmStrategy;
    return {
        setters: [
            function (ComputationalStrategy_1_1) {
                ComputationalStrategy_1 = ComputationalStrategy_1_1;
            },
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            },
            function (TriquiModelOfTheWorld_1_1) {
                TriquiModelOfTheWorld_1 = TriquiModelOfTheWorld_1_1;
            }
        ],
        execute: function () {
            CategorizationAlgorithmStrategy = class CategorizationAlgorithmStrategy extends ComputationalStrategy_1.ComputationalStrategy {
                constructor(categories) {
                    super();
                    this.categories = categories;
                }
                run() {
                    return new Promise((resolve) => {
                        WorkingMemory_1.WorkingMemory.instance.getBCPU().then((bcpu) => {
                            WorkingMemory_1.WorkingMemory.instance.getModelOfTheWorld(TriquiModelOfTheWorld_1.TriquiModelOfTheWorld).then((modelOfTheWorld) => {
                                var categoriesTmp = [];
                                //TODO Cargar los inputs desde la lista de inputs en la bcpu
                                var memoryInformation = bcpu.getInput("reset") ? bcpu.getInput("reset") : bcpu.getInput("player_move").information;
                                this.value = memoryInformation;
                                //TODO cargar los patrones desde la bcpu
                                var regExp = new RegExp('[0-2]_[0-2]');
                                if (regExp.test(this.value)) {
                                    var information = this.value.split("_");
                                    var cells = modelOfTheWorld.board.cells;
                                    var cellData = cells[+information[0]][+information[1]];
                                    if (cellData == null || cellData == '') {
                                        for (let category of this.categories) {
                                            if (category.category === 'player_move') {
                                                if (categoriesTmp.indexOf(category.category) < 0)
                                                    categoriesTmp.push(category.category);
                                            }
                                        }
                                    }
                                }
                                else {
                                    for (let category of this.categories) {
                                        if (category.category === 'reset') {
                                            if (categoriesTmp.indexOf(category.category) < 0)
                                                categoriesTmp.push(category.category);
                                        }
                                    }
                                }
                                resolve(categoriesTmp);
                            });
                        });
                    });
                }
                // <editor-fold defaultstate="collapsed" desc="GETs y SETs">
                /**
                 * @return the modelOfTheWorld
                 */
                get modelOfTheWorld() {
                    return this._modelOfTheWorld;
                }
                /**
                 * @param modelOfTheWorld the modelOfTheWorld to set
                 */
                set modelOfTheWorld(modelOfTheWorld) {
                    this._modelOfTheWorld = modelOfTheWorld;
                }
                /**
                 * @return the categories
                 */
                get categories() {
                    return this._categories;
                }
                /**
                 * @param categories the categories to set
                 */
                set categories(categories) {
                    this._categories = categories;
                }
                /**
                 * @return the value
                 */
                get value() {
                    return this._value;
                }
                /**
                 * @param value the value to set
                 */
                set value(value) {
                    this._value = value;
                }
            };
            exports_1("CategorizationAlgorithmStrategy", CategorizationAlgorithmStrategy);
        }
    };
});
