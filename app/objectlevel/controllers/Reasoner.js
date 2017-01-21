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
                /**
                 * EN el constructor se inicializan los elementos necesarios para que el razonador pueda realizar su trabajo
                 */
                constructor() {
                    this.sensing = (sensor) => {
                        //Cada vez que se active un sensor, se inicia un ciclo cognitivo
                        this.cognitiveLoop(sensor);
                    };
                    this._workingMemory = WorkingMemory_1.WorkingMemory.instance; //Se obtiene una instancia de la mamoria de trabaja para un acceso rápido
                    if (this._workingMemory.modelOfTheWorld == null) {
                        var modelOfTheWorld = new TriquiModelOfTheWorld_1.TriquiModelOfTheWorld(); //Se crea un modelo del mundo
                        modelOfTheWorld.addMission("win_game"); //Se define la misión(Goal) principal
                        modelOfTheWorld.addTokens("O", "X"); //Se agregan los tokens(Fichas de jugadores)
                        this._workingMemory.modelOfTheWorld = modelOfTheWorld; //EL nuevo modelo del mundo es registrado en la memoria de trabajo
                    }
                    this.initSensors(); //Se inicializan los sensores
                    this._perception = new Perception_1.Perception(); //Se inicializa el sistema de percepción
                    this._recognition = new Recognition_1.Recognition(); //Se inicializa el sistema de reconocimiento
                    this._categorization = new Categorization_1.Categorization(); //Se inicializa el sistema de categorización
                    this._planning = new Planning_1.Planning(); //Se inicializa el sistema de planeación
                    WorkingMemory_1.WorkingMemory.instance.getBCPU().then((bcpu) => {
                        bcpu.categorys = [new Category_1.Category('init')]; //Se agrega una categoría a la BCPU
                        WorkingMemory_1.WorkingMemory.instance.setBCPU(bcpu).then((result) => {
                            this.cognitiveLoop(); //Se inicia un ciclo cognitivo
                        });
                    });
                    // this.plans  =new HashMap<>();
                    //         Consola.getConsola('consolaEstadosMentales').log(WorkingMemory.instance.bcpu.name);
                }
                /**
                 * Proceso de inicialización de los sensores
                 */
                initSensors() {
                    this._playerMovement = new PlayerMovement_1.PlayerMovement(); //Se obtiene una instancia de sonsor encargado de registrar las jugadas
                    this._playerMovement.addEventListener('sensing', this.sensing); //Se asocia una acción a realizar cada vez que sea activado el sensor
                    this._resetButton = new ResetButton_1.ResetButton(); //Se obtiene una instancia de sonsor encargado de registrar el reinicio del juego
                    this._resetButton.addEventListener('sensing', this.sensing); //Se asocia una acción a realizar cada vez que sea activado el sensor
                }
                /**
                 * El ciclo cognitvo a desarrollar por el agente
                 */
                cognitiveLoop(sensor) {
                    if (sensor) {
                        Consola_1.Consola.getConsola('consolaEventos').log('Sensing....'); //Se nuestra en la consola de eventos el paso actual del proceso cognitivo
                        this.perception(sensor).then((perceived) => {
                            //Una vez se termine el proceso de percepción,
                            //se intenta identificar la información percibida
                            //mediante un proceso de reconocimiento
                            this.recognition().then((recognized) => {
                                //Si la información percibida se puede reconocer
                                if (recognized) {
                                    //Una vez reconocida la iformación percibida,
                                    //se intenta categorizar para su procesamiento
                                    this.categorization().then((categorized) => {
                                        //Si la información percibida se encuentra dentro de una del las categorías conocidas
                                        if (categorized) {
                                            //Se intenta realizar el proceso de planeación
                                            this.planning().then((plans) => {
                                                //Una vez obtenido un(os) plan(es)
                                                //Son ejecutadas las cciones definidas
                                                this.run(plans).then((executed) => {
                                                });
                                            });
                                        }
                                        else {
                                            //Si la información percibida no se encuentra dentro de una del las categorías conocidas
                                            //Se muestra en la consola de eventos.
                                            Consola_1.Consola.getConsola('consolaEventos').log('No associated category ...');
                                        }
                                    });
                                }
                                else {
                                    //Si la información percibida no pudo ser reconocida
                                    //Se muestra en la consola de eventos.
                                    Consola_1.Consola.getConsola('consolaEventos').log('No recognized ...');
                                }
                            });
                        });
                    }
                    else {
                        //Se intenta realizar el proceso de planeación
                        this.planning().then((plans) => {
                            //Una vez obtenido un(os) plan(es)
                            //Son ejecutadas las cciones definidas
                            this.run(plans).then((executed) => {
                            });
                        });
                    }
                }
                /**
                 * Actividad interna del razonador para realizar la percepción
                 */
                perception(sensor) {
                    return new Promise((resolve) => {
                        //Se recuperan los datos registrados por el sensor en la memoria sensorial
                        sensor.sensorMemory.retrieveInformation(sensor.type).then((result) => {
                            var param = {
                                'information': result.information,
                                'type_sensor': result.cue
                            };
                            //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                            Consola_1.Consola.getConsola('consolaEventos').log('Perceiving...');
                            //Se intentan procesar los datos generados por el sensor con el sistema de percepción
                            //Este internamente envia los resultados a la BCPU
                            this._perception.processInformation(param).then((result) => {
                                resolve(true);
                            });
                        });
                    });
                }
                /**
                 * Actividad interna del razonador para realizar el reconocimiento
                 */
                recognition() {
                    return new Promise((resolve) => {
                        //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                        Consola_1.Consola.getConsola('consolaEventos').log('Recognizing...');
                        //Se intentan procesar los datos generados por el sistema de percepción y que se encuentran en la BCPU
                        //Para identificarlos y definir si son reconocidos, usa el sistema de reconocimiento
                        this._recognition.processInformation().then((recognized) => {
                            //Una vez obtenido un resultado, se ectualiza el estado menta correspondiente
                            WorkingMemory_1.WorkingMemory.instance.updateMentalState("is_recognized", recognized).then((result) => {
                                //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                                Consola_1.Consola.getConsola('consolaEventos').log(recognized ? 'Recognized...' : 'No recognized...');
                                resolve(recognized);
                            });
                        });
                    });
                }
                /**
                 * Actividad interna del razonador para realizar la categorización
                 */
                categorization() {
                    return new Promise((resolve) => {
                        //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                        Consola_1.Consola.getConsola('consolaEventos').log('Categorizing...');
                        //Se intentan procesar los datos generados por el sistema de reconocimiento y que se encuentran en la BCPU
                        //Para enmarcarlos dentro de la categorias conocidas.
                        //Es necesario decir al sistema de categorización cual será la estrategia a utilizar
                        this._categorization.processInformation(CategorizationAlgorithmStrategy_1.CategorizationAlgorithmStrategy).then((categorized) => {
                            //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                            Consola_1.Consola.getConsola('consolaEventos').log(categorized ? 'Categorized...' : 'No categorized...');
                            resolve(categorized);
                        });
                    });
                }
                /**
                 * Actividad interna del razonador para realizar la planeación
                 */
                planning() {
                    return new Promise((resolve) => {
                        //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                        Consola_1.Consola.getConsola('consolaEventos').log('Planning...');
                        //Se intentan realizar la planeación con base en la categorización previa y que se encuentran en la BCPU            
                        //Es necesario decir al sistema de planeación cual será la estrategia a utilizar
                        this._planning.processInformation(PlanningAlgorithmStrategy_1.PlanningAlgorithmStrategy).then((plans) => {
                            //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                            Consola_1.Consola.getConsola('consolaEventos').log('Planned...');
                            resolve(plans);
                        });
                    });
                }
                /**
                 * Actividad interna del razonador para la ejecuación de los planes
                 */
                run(plans) {
                    return new Promise((resolve) => {
                        //Se muestra en la consola de eventos, el proceso actual del ciclo cognitivo
                        Consola_1.Consola.getConsola('consolaEventos').log('Executing plan...');
                        //Se intentan ejecutar las acciones definidas en los planes que se encuentran en la bcpu            
                        this._planning.executePlans(plans).then((executed) => {
                            resolve(executed);
                        });
                    });
                }
            };
            exports_1("Reasoner", Reasoner);
        }
    };
});
