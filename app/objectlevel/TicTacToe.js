System.register(["../../libs/CarinaCore", '../../libs/Consola', './controllers/Reasoner'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var modulo, mConsola, Reasoner_1;
    var State, MemoryDriverIndexDB, BasicMemoryUnity, Memory, Pattern, Category, ModelOfTheSelf, BasicCognitiveProcessingUnit, TicTacToe;
    return {
        setters:[
            function (modulo_1) {
                modulo = modulo_1;
            },
            function (mConsola_1) {
                mConsola = mConsola_1;
            },
            function (Reasoner_1_1) {
                Reasoner_1 = Reasoner_1_1;
            }],
        execute: function() {
            State = carina.metacore.State;
            MemoryDriverIndexDB = carina.memory.MemoryDriverIndexDB;
            BasicMemoryUnity = carina.memory.BasicMemoryUnity;
            Pattern = carina.objectlevel.Pattern;
            Category = carina.objectlevel.Category;
            BasicCognitiveProcessingUnit = carina.objectlevel.BasicCognitiveProcessingUnit;
            global.AgentSettings = modulo.objectlevel.AgentSettings;
            global.LongTermMemory = modulo.memory.LongTermMemory;
            global.PerceptualMemory = modulo.memory.PerceptualMemory;
            global.SensorMemory = modulo.memory.SensorMemory;
            global.WorkingMemory = modulo.memory.WorkingMemory;
            class TicTacToe {
                constructor() {
                    this._path = './app/';
                }
                init() {
                    this.initConsoles();
                    this.loadJSON(this._path + 'config.json').then((result) => {
                        this._config = result;
                        global.AgentSettings.config = result;
                        this.initMemories().then(() => {
                            this.loadInitialData(this._config).then((result) => {
                                this.loadCognitiveModels(this._config["cognitive_models"]).then((result) => {
                                    this.initModelOfTheSelf().then((result) => {
                                        var workingMemory = global.WorkingMemory.instance;
                                        workingMemory.bcpu = new BasicCognitiveProcessingUnit();
                                        //Esto es usado para mostrar los eventos que sucenden en el sistema
                                        // List<Event> eventos =new ArrayList<>();
                                        // wm.storeInformation(new BasicMemoryUnity("events", eventos));
                                        // var reasoner:Reasoner   =new Reasoner(inputs,out);
                                        var reasoner = new Reasoner_1.Reasoner();
                                        // if(reasoner.perception()){
                                        //     if(reasoner.recognition()){
                                        //         reasoner.categorization();
                                        //         if(wm.getMental_state("is_categorized").getValue()){//Es una categoria conocida
                                        //             reasoner.planning();
                                        //             reasoner.run();
                                        //         }
                                        //     }
                                        // }
                                        // reasoner.showBoard();
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
                    global.Consola = mConsola.Consola;
                    var consolaEventos = global.Consola.getConsola('consolaEventos');
                    consolaEventos.init('consolaEventos');
                    var consolaEstadosMentales = global.Consola.getConsola('consolaEstadosMentales');
                    consolaEstadosMentales.init('consolaEstadosMentales');
                }
                /** Carga la inromación el JSON a las memorias utilizadas por el sistema **/
                initMemories() {
                    return new Promise((resolve, reject) => {
                        var config = global.AgentSettings.config;
                        var memoryConfig = config['memory_management'];
                        if (memoryConfig['type'] === 'indexDB') {
                            var dataBaseConfig = memoryConfig['config'];
                            this.initMemory(dataBaseConfig, global.LongTermMemory, 'longterm_memory').then((result) => {
                                this.initMemory(dataBaseConfig, global.PerceptualMemory, 'perceptual_memory').then((result) => {
                                    this.initMemory(dataBaseConfig, global.SensorMemory, 'sensors').then((result) => {
                                        this.initMemory(dataBaseConfig, global.WorkingMemory, 'working_memory').then((result) => {
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
                        var memoryDriverMemory = new MemoryDriverIndexDB(dbConfigMemory);
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
                        initialPatterns.push(new Pattern(pattern));
                    }
                    global.LongTermMemory.instance.storeInformation(new BasicMemoryUnity("patterns", initialPatterns));
                }
                loadCategories(categories) {
                    var initialCategories = [];
                    for (let category of categories) {
                        initialCategories.push(new Category(category));
                    }
                    global.LongTermMemory.instance.storeInformation(new BasicMemoryUnity("categories", initialCategories));
                }
                loadMentalStates(states) {
                    var stateTmp;
                    //Hay estados persistentes y volatiles, ya que algunos no se deben reiniciar cada vez que se inicie una peticion 
                    var persistents = states["persistents"];
                    var pKeys = Object.keys(persistents);
                    for (let key of pKeys) {
                        stateTmp = new State(key, persistents[key]);
                        global.WorkingMemory.instance.setMentalState(stateTmp, false).then((result) => { });
                    }
                    ;
                    var volatiles = states["volatile"];
                    var vKeys = Object.keys(volatiles);
                    for (let key of vKeys) {
                        stateTmp = new State(key, volatiles[key]);
                        global.WorkingMemory.instance.setMentalState(stateTmp, false).then((result) => { });
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
            }
            exports_1("TicTacToe", TicTacToe);
        }
    }
});
