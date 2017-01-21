System.register(["../../libs/carina/metacore/State", "../../libs/carina/memory/MemoryDriverIndexDB", "../../libs/carina/memory/BasicMemoryUnity", "../../libs/carina/memory/LongTermMemory", "../../libs/carina/memory/PerceptualMemory", "../../libs/carina/memory/SensorMemory", "../../libs/carina/memory/WorkingMemory", "../../libs/carina/objectlevel/Pattern", "../../libs/carina/objectlevel/Category", "../../libs/carina/objectlevel/BasicCognitiveProcessingUnit", "../../libs/carina/objectlevel/Agent", "../../libs/carina/objectlevel/AgentSettings", "../../libs/Consola", "./controllers/Reasoner"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var State_1, MemoryDriverIndexDB_1, BasicMemoryUnity_1, LongTermMemory_1, PerceptualMemory_1, SensorMemory_1, WorkingMemory_1, Pattern_1, Category_1, BasicCognitiveProcessingUnit_1, Agent_1, AgentSettings_1, Consola_1, Reasoner_1, TicTacToe;
    return {
        setters: [
            function (State_1_1) {
                State_1 = State_1_1;
            },
            function (MemoryDriverIndexDB_1_1) {
                MemoryDriverIndexDB_1 = MemoryDriverIndexDB_1_1;
            },
            function (BasicMemoryUnity_1_1) {
                BasicMemoryUnity_1 = BasicMemoryUnity_1_1;
            },
            function (LongTermMemory_1_1) {
                LongTermMemory_1 = LongTermMemory_1_1;
            },
            function (PerceptualMemory_1_1) {
                PerceptualMemory_1 = PerceptualMemory_1_1;
            },
            function (SensorMemory_1_1) {
                SensorMemory_1 = SensorMemory_1_1;
            },
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            },
            function (Pattern_1_1) {
                Pattern_1 = Pattern_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            },
            function (BasicCognitiveProcessingUnit_1_1) {
                BasicCognitiveProcessingUnit_1 = BasicCognitiveProcessingUnit_1_1;
            },
            function (Agent_1_1) {
                Agent_1 = Agent_1_1;
            },
            function (AgentSettings_1_1) {
                AgentSettings_1 = AgentSettings_1_1;
            },
            function (Consola_1_1) {
                Consola_1 = Consola_1_1;
            },
            function (Reasoner_1_1) {
                Reasoner_1 = Reasoner_1_1;
            }
        ],
        execute: function () {
            TicTacToe = class TicTacToe extends Agent_1.Agent {
                constructor() {
                    super(...arguments);
                    //TODO Todo lo que se hace aquí se puede pasar a la clase base Agent
                    this._path = './app/';
                }
                init() {
                    this.initConsoles();
                    this.loadJSON(this._path + 'config.json').then((result) => {
                        this._config = result;
                        AgentSettings_1.AgentSettings.config = result;
                        this.initMemories().then(() => {
                            this.loadInitialData(this._config).then((result) => {
                                this.loadCognitiveModels(this._config["cognitive_models"]).then((result) => {
                                    this.initModelOfTheSelf().then((result) => {
                                        var workingMemory = WorkingMemory_1.WorkingMemory.instance;
                                        var tmpBCPU = new BasicCognitiveProcessingUnit_1.BasicCognitiveProcessingUnit();
                                        WorkingMemory_1.WorkingMemory.instance.setBCPU(tmpBCPU).then((result) => {
                                            var reasoner = new Reasoner_1.Reasoner();
                                        });
                                    });
                                });
                            });
                        });
                    }).catch((result) => {
                        console.error('Error cargando el archivo de configuración');
                    });
                }
                /** Se usa para cargar el archivo de configuración **/
                loadJSON(url) {
                    return new Promise((resolve, reject) => {
                        var request = new XMLHttpRequest();
                        request.open('get', url, true);
                        request.onload = function (event) {
                            resolve(JSON.parse(event.currentTarget.responseText));
                        };
                        request.onerror = function (event) {
                            reject({ error: true });
                        };
                        request.send();
                    });
                }
                /** Se inicializan las consolas para mostrar un log de los procesos internos realizados **/
                initConsoles() {
                    var consolaEventos = Consola_1.Consola.getConsola('consolaEventos');
                    consolaEventos.init('consolaEventos');
                    var consolaEstadosMentales = Consola_1.Consola.getConsola('consolaEstadosMentales');
                    consolaEstadosMentales.init('consolaEstadosMentales');
                }
                /** Carga la inromación el JSON a las memorias utilizadas por el sistema **/
                initMemories() {
                    return new Promise((resolve, reject) => {
                        var config = AgentSettings_1.AgentSettings.config;
                        var memoryConfig = config['memory_management'];
                        if (memoryConfig['type'] === 'indexDB') {
                            var dataBaseConfig = memoryConfig['config'];
                            this.initMemory(dataBaseConfig, LongTermMemory_1.LongTermMemory, 'longterm_memory').then((result) => {
                                this.initMemory(dataBaseConfig, PerceptualMemory_1.PerceptualMemory, 'perceptual_memory').then((result) => {
                                    this.initMemory(dataBaseConfig, SensorMemory_1.SensorMemory, 'sensors').then((result) => {
                                        this.initMemory(dataBaseConfig, WorkingMemory_1.WorkingMemory, 'working_memory').then((result) => {
                                            resolve(true);
                                        });
                                    });
                                });
                            });
                        }
                    });
                }
                initMemory(dataBaseConfig, memory, tableName) {
                    return new Promise((resolve) => {
                        var dbConfigMemory = JSON.parse(JSON.stringify(dataBaseConfig));
                        dbConfigMemory['tableName'] = tableName;
                        var memoryDriverMemory = new MemoryDriverIndexDB_1.MemoryDriverIndexDB(dbConfigMemory);
                        memoryDriverMemory.init().then((result) => {
                            memory.init(memoryDriverMemory);
                            resolve(true);
                        });
                    });
                }
                /** Carga los datos iniciales definidos por el archivo de configuración **/
                loadInitialData(config) {
                    return new Promise((resolve) => {
                        var ltm = config['initial_data']['long_term_memory'];
                        this.loadPatterns(ltm['patterns']);
                        this.loadCategories(ltm['categories']);
                        this.loadMentalStates(config['initial_data']['mental_states']);
                        resolve(true);
                    });
                }
                loadPatterns(patterns) {
                    var initialPatterns = [];
                    for (let pattern of patterns) {
                        initialPatterns.push(new Pattern_1.Pattern(pattern));
                    }
                    LongTermMemory_1.LongTermMemory.instance.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("patterns", initialPatterns));
                }
                loadCategories(categories) {
                    var initialCategories = [];
                    for (let category of categories) {
                        initialCategories.push(new Category_1.Category(category));
                    }
                    LongTermMemory_1.LongTermMemory.instance.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("categories", initialCategories));
                }
                loadMentalStates(states) {
                    var stateTmp;
                    //Hay estados persistentes y volatiles, ya que algunos no se deben reiniciar cada vez que se inicie una peticion 
                    var persistents = states["persistents"];
                    var pKeys = Object.keys(persistents);
                    for (let key of pKeys) {
                        stateTmp = new State_1.State(key, persistents[key]);
                        WorkingMemory_1.WorkingMemory.instance.setMentalState(stateTmp, false).then((result) => { });
                    }
                    ;
                    var volatiles = states["volatile"];
                    var vKeys = Object.keys(volatiles);
                    for (let key of vKeys) {
                        stateTmp = new State_1.State(key, volatiles[key]);
                        WorkingMemory_1.WorkingMemory.instance.setMentalState(stateTmp, false).then((result) => { });
                    }
                    ;
                }
                loadCognitiveModels(cognitiveModelsJSON) {
                    return new Promise((resolve) => {
                        var cognitiveModelURL = cognitiveModelsJSON[0]["cognitive_model"];
                        //            JsonReader  modelJSON;
                        //            modelJSON = Json.createReader(new FileReader(this._path+"/cognitive_models/"+cognitiveModelURL));            
                        //            this._interpreter   =Interpreter.interpreter();
                        //            this._interpreter.setModel(modelJSON.readObject());
                        //            _interpreter.getCognitiveFuntions();
                        resolve(true);
                    });
                }
                initModelOfTheSelf() {
                    return new Promise((resolve) => {
                        var modelOfTheSelf;
                        resolve(true);
                        //        ModelOfTheSelf  modelOfTheSelf  = ModelOfTheSelf.modelOfTheSelf();
                        //        modelOfTheSelf.getKnownCognitiveFunctions().put("cf_triqui_perception",new CFBase());
                        //        CognitiveFunction  m=modelOfTheSelf.getKnownCognitiveFunctions().get("cf_triqui_perception");
                        //        m.processInformation(null);
                    });
                }
            };
            exports_1("TicTacToe", TicTacToe);
        }
    };
});
