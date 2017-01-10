System.register(["../../../libs/carina/memory/WorkingMemory", "../../../libs/carina/objectlevel/Perception", "../../../libs/carina/objectlevel/Recognition", "../../../libs/carina/objectlevel/Categorization", "../../../libs/carina/objectlevel/Planning", "../../../libs/carina/objectlevel/Category", "../../../libs/Consola", "../sensors/PlayerMovement", "../sensors/ResetButton", "../models/TriquiModelOfTheWorld", "../computationalstrategies/CategorizationAlgorithmStrategy", "../computationalstrategies/PlanningAlgorithmStrategy"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WorkingMemory_1, Perception_1, Recognition_1, Categorization_1, Planning_1, Category_1, Consola_1, PlayerMovement_1, ResetButton_1, TriquiModelOfTheWorld_1, CategorizationAlgorithmStrategy_1, PlanningAlgorithmStrategy_1, Reasoner;
    return {
        setters: [
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            },
            function (Perception_1_1) {
                Perception_1 = Perception_1_1;
            },
            function (Recognition_1_1) {
                Recognition_1 = Recognition_1_1;
            },
            function (Categorization_1_1) {
                Categorization_1 = Categorization_1_1;
            },
            function (Planning_1_1) {
                Planning_1 = Planning_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (Consola_1_1) {
                Consola_1 = Consola_1_1;
            },
            function (PlayerMovement_1_1) {
                PlayerMovement_1 = PlayerMovement_1_1;
            },
            function (ResetButton_1_1) {
                ResetButton_1 = ResetButton_1_1;
            },
            function (TriquiModelOfTheWorld_1_1) {
                TriquiModelOfTheWorld_1 = TriquiModelOfTheWorld_1_1;
            },
            function (CategorizationAlgorithmStrategy_1_1) {
                CategorizationAlgorithmStrategy_1 = CategorizationAlgorithmStrategy_1_1;
            },
            function (PlanningAlgorithmStrategy_1_1) {
                PlanningAlgorithmStrategy_1 = PlanningAlgorithmStrategy_1_1;
            }
        ],
        execute: function () {
            /**
             * Se encarga de realizar el proceso de razonamiento del triqui
             */
            Reasoner = class Reasoner {
                constructor(inputs, output) {
                    this._inputs = [];
                    this.sensing = (sensor) => {
                        this.cicloCognitivo(sensor);
                    };
                    this._inputs = inputs ? inputs : [];
                    this._output = output ? output : null;
                    this._workingMemory = WorkingMemory_1.WorkingMemory.instance;
                    if (this._workingMemory.modelOfTheWorld == null) {
                        var modelOfTheWorld = new TriquiModelOfTheWorld_1.TriquiModelOfTheWorld();
                        modelOfTheWorld.addMission("win_game");
                        modelOfTheWorld.addTokens("O", "X");
                        this._workingMemory.modelOfTheWorld = modelOfTheWorld;
                    }
                    this.initSensors();
                    this._recognition = new Recognition_1.Recognition();
                    this._categorization = new Categorization_1.Categorization();
                    this._perception = new Perception_1.Perception();
                    this._planning = new Planning_1.Planning();
                    this._plans = [];
                    WorkingMemory_1.WorkingMemory.instance.getBCPU().then((bcpu) => {
                        bcpu.categorys = [new Category_1.Category('init')];
                        WorkingMemory_1.WorkingMemory.instance.setBCPU(bcpu).then((result) => {
                            this.cicloCognitivo();
                        });
                    });
                    // this.plans  =new HashMap<>();
                    //         Consola.getConsola('consolaEstadosMentales').log(WorkingMemory.instance.bcpu.name);
                }
                initSensors() {
                    this._playerMovement = new PlayerMovement_1.PlayerMovement();
                    this._playerMovement.addEventListener('sensing', this.sensing);
                    this._resetButton = new ResetButton_1.ResetButton();
                    this._resetButton.addEventListener('sensing', this.sensing);
                }
                /**
                 * Se encarga de la percepción del agente, se llega aquí despues de que un sensor se ha disparado
                 */
                cicloCognitivo(sensor) {
                    if (sensor) {
                        Consola_1.Consola.getConsola('consolaEventos').log('Sensing....');
                        this.perception(sensor).then((perceived) => {
                            this.recognition().then((recognized) => {
                                if (recognized) {
                                    this.categorization().then((categorized) => {
                                        if (categorized) {
                                            this.planning().then((plans) => {
                                                this.run(plans).then((executed) => {
                                                });
                                            });
                                        }
                                        else {
                                            Consola_1.Consola.getConsola('consolaEventos').log('No associated category ...');
                                        }
                                    });
                                }
                            });
                        });
                        this.showBoard();
                    }
                    else {
                        this.planning().then((plans) => {
                            this.run(plans).then((executed) => {
                            });
                        });
                    }
                    /*
                    if (sensor.type==='player_move'){//Es posible que este condicional no sea necesario
                        this.perception(sensor).then((perceived)=>{
                            this.recognition().then((recognized)=>{
                                console.log(recognized);
                            });
                        });
                    }else if (sensor.type==='reset'){
                        this.perception(sensor).then((perceived)=>{
                            this.recognition().then((recognized)=>{
                                console.log(recognized);
                            });
                        });
                    }
                    */
                }
                perception(sensor) {
                    return new Promise((resolve) => {
                        sensor.sensorMemory.retrieveInformation(sensor.type).then((result) => {
                            var param = {
                                'information': result.information,
                                'type_sensor': result.cue
                            };
                            Consola_1.Consola.getConsola('consolaEventos').log('Perceiving...');
                            this._perception.processInformation(param).then((result) => {
                                resolve(true);
                            });
                        });
                    });
                }
                recognition() {
                    return new Promise((resolve) => {
                        Consola_1.Consola.getConsola('consolaEventos').log('Recognizing...');
                        this._recognition.processInformation().then((recognized) => {
                            WorkingMemory_1.WorkingMemory.instance.updateMentalState("is_recognized", recognized).then((result) => {
                                Consola_1.Consola.getConsola('consolaEventos').log(recognized ? 'Recognized...' : 'No recognized...');
                                resolve(recognized);
                            });
                        });
                    });
                }
                categorization() {
                    return new Promise((resolve) => {
                        Consola_1.Consola.getConsola('consolaEventos').log('Categorizing...');
                        this._categorization.processInformation(CategorizationAlgorithmStrategy_1.CategorizationAlgorithmStrategy).then((categorized) => {
                            Consola_1.Consola.getConsola('consolaEventos').log(categorized ? 'Categorized...' : 'No categorized...');
                            resolve(categorized);
                        });
                    });
                }
                planning() {
                    return new Promise((resolve) => {
                        Consola_1.Consola.getConsola('consolaEventos').log('Planning...');
                        this._planning.processInformation(PlanningAlgorithmStrategy_1.PlanningAlgorithmStrategy).then((plans) => {
                            Consola_1.Consola.getConsola('consolaEventos').log('Planned...');
                            resolve(plans);
                        });
                    });
                }
                run(plans) {
                    return new Promise((resolve) => {
                        Consola_1.Consola.getConsola('consolaEventos').log('Executing plan...');
                        this._planning.executePlans(plans).then((executed) => {
                            resolve(executed);
                        });
                    });
                }
                showBoard() {
                    return new Promise((resolve) => {
                        Consola_1.Consola.getConsola('consolaEventos').log('Acting...');
                    });
                }
            };
            exports_1("Reasoner", Reasoner);
        }
    };
});
