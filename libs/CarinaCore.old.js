var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class RootElement {
            constructor() {
            }
            get name() {
                return this._name;
            }
            set name(name) {
                this._name = name;
            }
            get output() {
                return this._output;
            }
            set output(output) {
                this._output = output;
            }
        }
        metacore.RootElement = RootElement;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class Element extends metacore.RootElement {
        }
        metacore.Element = Element;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class Event extends metacore.Element {
            constructor(name) {
                super();
                this.name = name;
            }
        }
        metacore.Event = Event;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class CognitiveFunction extends metacore.Element {
        }
        metacore.CognitiveFunction = CognitiveFunction;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class EstructureElement extends metacore.RootElement {
        }
        metacore.EstructureElement = EstructureElement;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class Field extends metacore.RootElement {
            constructor(name, value) {
                super();
                this.name = name;
                this.value = value;
            }
            get value() {
                return this._value;
            }
            set value(value) {
                this._value = value;
            }
        }
        metacore.Field = Field;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class Profile extends metacore.RootElement {
        }
        metacore.Profile = Profile;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class ReasoningTaskProfile extends metacore.Profile {
            ReasoningTaskProfile(fields) {
                this._fields = [];
                for (let field of fields) {
                    this.setField(field.name, field.value);
                }
            }
            setField(name, value) {
                this._fields.push(new metacore.Field(name, value));
            }
        }
        metacore.ReasoningTaskProfile = ReasoningTaskProfile;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class State extends metacore.Element {
            constructor(name, value) {
                super();
                this.name = name;
                this.value = value;
            }
            get value() {
                return this._value;
            }
            set value(value) {
                this._value = value;
            }
        }
        metacore.State = State;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class FuntionalElement extends metacore.RootElement {
            constructor() {
                super();
            }
            set effect(effect) {
                this._effect = effect;
            }
            get effect() {
                return this._effect;
            }
            set precodition(precodition) {
                this._precodition = precodition;
            }
            get precodition() {
                return this._precodition;
            }
        }
        metacore.FuntionalElement = FuntionalElement;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class Goal extends metacore.Element {
            set sourceState(state) {
                this._sourceState = state;
            }
            get sourceState() {
                return this._sourceState;
            }
            set targetState(state) {
                this._targetState = state;
            }
            get targetState() {
                return this._targetState;
            }
        }
        metacore.Goal = Goal;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class Task extends metacore.FuntionalElement {
            constructor() {
                super(...arguments);
                this._executed = false;
                this._successful = false;
                this._stopPlan = false;
            }
            Task() { }
            buildProfile() { }
            updateTaskState(executed, successful, stopPlan) {
                this._executed = executed;
                this._successful = successful;
                this._stopPlan = stopPlan;
            }
            get goal() {
                return this._goal;
            }
            set goal(goal) {
                this._goal = goal;
            }
            get executed() {
                return this._executed;
            }
            get successful() {
                return this._successful;
            }
            get stopPlan() {
                return this._stopPlan;
            }
            get effects() {
                return this._effects;
            }
            set effects(effects) {
                this._effects = effects;
            }
            get preconditions() {
                return this._preconditions;
            }
            set preconditions(preconditions) {
                this._preconditions = preconditions;
            }
            addEffect(effect) {
                if (this._effects == null)
                    this._effects = [];
                this._effects.push(effect);
            }
            addPrecondition(effect) {
                if (this._preconditions == null)
                    this._preconditions = [];
                this._preconditions.push(effect);
            }
            getEffect(pos) {
                return typeof pos === 'number' ? this.getEffectN(pos) : this.getEffectS(pos);
            }
            getEffectN(pos) {
                if (this._effects == null || this._effects.length <= pos)
                    return null;
                return this.effects[pos];
            }
            getEffectS(name) {
                for (let stateTmp of this._effects) {
                    if (stateTmp.name == name)
                        return stateTmp;
                }
                return null;
            }
            getPrecondition(pos) {
                if (typeof pos === 'number') {
                    return this.getPreconditionN(pos);
                }
                else if (typeof pos === 'string') {
                    return this.getPreconditionS(pos);
                }
            }
            getPreconditionN(pos) {
                if (this._preconditions == null || this._preconditions.length <= pos)
                    return null;
                return this.preconditions[pos];
            }
            getPreconditionS(name) {
                for (let stateTmp of this._preconditions) {
                    if (stateTmp.name == name)
                        return stateTmp;
                }
                return null;
            }
        }
        metacore.Task = Task;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class Action extends metacore.Task {
        }
        metacore.Action = Action;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class Strategy extends metacore.FuntionalElement {
        }
        metacore.Strategy = Strategy;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class ComputationalStrategy extends metacore.Strategy {
        }
        metacore.ComputationalStrategy = ComputationalStrategy;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        class Plan extends metacore.Element {
            constructor() {
                super(...arguments);
                this._currentAction = 0;
            }
            Plan() {
                this._actions = [];
            }
            executePlan() {
                var currentAction;
                if (this.actions.length <= 0)
                    return null;
                do {
                    currentAction = this.actions[this.currentAction];
                    currentAction.run();
                    this.currentAction = this.currentAction + 1;
                } while (this.currentAction < this.actionsLength && !currentAction.stopPlan);
                return true;
            }
            get actionsLength() {
                return this._actions.length;
            }
            get actions() {
                return this._actions;
            }
            set actions(actions) {
                this._actions = actions;
            }
            set action(action) {
                this.actions.push(action);
            }
            get currentAction() {
                return this._currentAction;
            }
            set currentAction(currentAction) {
                this._currentAction = currentAction;
            }
        }
        metacore.Plan = Plan;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var memory;
    (function (memory) {
        class BasicMemoryUnity {
            constructor(cue, information) {
                this.cue = cue;
                this.information = information;
            }
        }
        memory.BasicMemoryUnity = BasicMemoryUnity;
    })(memory = carina.memory || (carina.memory = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var memory;
    (function (memory) {
        class MemoryDriver {
            constructor(config) {
                this.config = config;
            }
            get config() {
                return this._config;
            }
            set config(config) {
                this._config = config;
            }
        }
        memory.MemoryDriver = MemoryDriver;
    })(memory = carina.memory || (carina.memory = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var memory;
    (function (memory) {
        class Memory {
            constructor(driver) {
                this._driver = null;
                this._driver = driver;
            }
            storeInformation(information) {
                return this.driver.storeInformation(information);
            }
            retrieveInformation(cue) {
                return this.driver.retrieveInformation(cue);
            }
            forgetInformation(cue) {
                this.driver.forgetInformation(cue);
            }
            get driver() {
                return this._driver;
            }
            set driver(driver) {
                this._driver = driver;
            }
        }
        memory.Memory = Memory;
    })(memory = carina.memory || (carina.memory = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var memory;
    (function (memory) {
        class LongTermMemory extends memory.Memory {
            constructor(driver) {
                super(driver);
            }
            static init(driver) {
                if (this._instance == null) {
                    this._instance = new LongTermMemory(driver);
                }
            }
            static get instance() {
                return this._instance;
            }
        }
        LongTermMemory._instance = null;
        memory.LongTermMemory = LongTermMemory;
    })(memory = carina.memory || (carina.memory = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var memory;
    (function (memory) {
        class SensorMemory extends memory.Memory {
            constructor(driver) {
                super(driver);
            }
            static init(driver) {
                if (this._instance == null) {
                    this._instance = new SensorMemory(driver);
                }
            }
            static get instance() {
                return this._instance;
            }
        }
        memory.SensorMemory = SensorMemory;
    })(memory = carina.memory || (carina.memory = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var metacore;
    (function (metacore) {
        var SensorMemory = carina.memory.SensorMemory;
        class Sensor extends metacore.RootElement {
            constructor() {
                super();
                this._sensorMemory = SensorMemory.instance;
            }
            perceiveInformation(value) {
                return null;
            }
            get type() {
                return this._type;
            }
            set type(type) {
                this._type = type;
            }
            get sensorMemory() {
                return this._sensorMemory;
            }
        }
        metacore.Sensor = Sensor;
    })(metacore = carina.metacore || (carina.metacore = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var WorkingMemory = carina.memory.WorkingMemory;
        class ModelOfTheWorld {
            constructor() {
                this._isCreated = false;
            }
            get mission() {
                return this._mission;
            }
            set mission(mission) {
                this._mission = mission;
            }
            getStateIsCreated() {
                return new Promise((resolve, reject) => {
                    WorkingMemory.instance.retrieveInformation("is_created").then((result) => {
                        var isCreated = result;
                        resolve(isCreated != null ? isCreated.information : this._isCreated);
                    });
                });
            }
            set stateIsCreated(isCreated) {
                this._isCreated = isCreated;
            }
        }
        objectlevel.ModelOfTheWorld = ModelOfTheWorld;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var RootElement = carina.metacore.RootElement;
        class BasicCognitiveProcessingUnit extends RootElement {
            addInput(input, typeSensor) {
                if (typeof input === "Input") {
                    this.input = input;
                }
                else {
                    var newInput = new objectlevel.Input();
                    newInput.information = input;
                    newInput.type = typeSensor;
                    this.input = newInput;
                }
            }
            addPattern(pattern) {
                var newPattern = new objectlevel.Pattern(pattern);
                this.pattern = newPattern;
            }
            addCategories(categories) {
                if (categories != null) {
                    var categorysTemp = [];
                    var newCategory;
                    for (var category of categories) {
                        newCategory = new objectlevel.Category();
                        newCategory.category = category;
                        categorysTemp.push(newCategory);
                    }
                    this.categorys = categorysTemp;
                }
            }
            addPlans(plans) {
                this._plans = plans;
            }
            get inputs() {
                return this._inputs;
            }
            getInput(type) {
                return this._inputs == null ? null : this._inputs[type];
            }
            set input(input) {
                if (this._inputs == null)
                    this._inputs = [];
                this._inputs[input.type] = input;
            }
            get pattern() {
                return this._pattern;
            }
            set pattern(pattern) {
                this._pattern = pattern;
            }
            get categorys() {
                return this._categorys;
            }
            set categorys(categorys) {
                this._categorys = categorys;
            }
            get plans() {
                return this._plans;
            }
            get goal() {
                return this._goal;
            }
            set goal(goal) {
                this._goal = goal;
            }
        }
        objectlevel.BasicCognitiveProcessingUnit = BasicCognitiveProcessingUnit;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var memory;
    (function (memory) {
        class WorkingMemory extends memory.Memory {
            constructor(driver) {
                super(driver);
                this.driver.retrieveInformation("bcpu").then((result) => {
                    if (result != null) {
                        this.bcpu = result.information;
                    }
                });
                this.driver.retrieveInformation("model_of_the_world").then((result) => {
                    if (result != null) {
                        this.modelOfTheWorld = result.information;
                    }
                });
                this.driver.retrieveInformation("profiles").then((result) => {
                    if (result != null) {
                        for (let profile of result.information) {
                            this.setProfiles(profile, true);
                        }
                    }
                });
                this.mentalStates = [];
                this.driver.retrieveInformation("mental_state").then((result) => {
                    if (result != null) {
                        for (let ms of result.information) {
                            this.setMentalState(ms);
                        }
                    }
                });
            }
            static init(driver) {
                if (this._instance == null) {
                    this._instance = new WorkingMemory(driver);
                }
            }
            get bcpu() {
                return this._bcpu;
            }
            set bcpu(bcpu) {
                this._bcpu = bcpu;
                this.syncBCPU(bcpu);
            }
            get modelOfTheWorld() {
                return this._model_of_the_world;
            }
            set modelOfTheWorld(model_of_the_world) {
                this._model_of_the_world = model_of_the_world;
                this.syncModelOfTheWorld(model_of_the_world);
            }
            getProfile(id) {
                return this._profiles[id];
            }
            get profiles() {
                return this._profiles;
            }
            setProfiles(profile, s) {
                this.profiles.push(profile);
                if (!s) {
                    this.driver.storeInformation(new memory.BasicMemoryUnity("profiles", this.profiles));
                }
            }
            get mentalStates() {
                return this._mental_state;
            }
            set mentalStates(ms) {
                this._mental_state = ms;
            }
            getMentalState(state) {
                for (let s of this.mentalStates) {
                    if (s.name === state) {
                        return s;
                    }
                }
                return null;
            }
            updateMentalState(name, value) {
                return new Promise((resolve) => {
                    var pos = this.getMentalStatePos(name);
                    if (pos >= 0) {
                        var state = this._mental_state[pos];
                        state.value = value;
                        this.setMentalState(state).then((result) => {
                            resolve(result);
                        });
                    }
                });
            }
            setMentalState(ms, s) {
                return new Promise((resolve) => {
                    var pos = this.getMentalStatePos(ms.name);
                    if (pos == -1) {
                        this._mental_state.push(ms);
                    }
                    else {
                        this._mental_state[pos].value = ms.value;
                    }
                    if (!s) {
                        this.driver.storeInformation(new memory.BasicMemoryUnity("mental_state", this.mentalStates)).then((result) => {
                            resolve(result);
                        });
                    }
                });
            }
            static get instance() {
                return this._instance;
            }
            getMentalStatePos(name) {
                for (let i = 0; i < this._mental_state.length; i++) {
                    if (this._mental_state[i].name === name)
                        return i;
                }
                return -1;
            }
            syncBCPU(value) {
                this.driver.storeInformation(new memory.BasicMemoryUnity("bcpu", value));
            }
            syncModelOfTheWorld(value) {
                this.driver.storeInformation(new memory.BasicMemoryUnity("model_of_the_world", value));
            }
        }
        memory.WorkingMemory = WorkingMemory;
    })(memory = carina.memory || (carina.memory = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var memory;
    (function (memory) {
        class MemoryDriverIndexDB extends memory.MemoryDriver {
            constructor(config) {
                super(config);
            }
            init() {
                var _this = this;
                return new Promise((resolve, reject) => {
                    var indexedDB = window.indexedDB;
                    var dbRequest = indexedDB.open(_this.config['db']);
                    dbRequest.onerror = function (event) {
                        reject(false);
                    };
                    dbRequest.onsuccess = function (e) {
                        var db = dbRequest.result;
                        if (!db.objectStoreNames.contains(_this.config['tableName'])) {
                            var version = db.version + 1;
                            db.close();
                            var dbRequest2 = indexedDB.open(_this.config['db'], version);
                            dbRequest2.onupgradeneeded = function (event) {
                                db = dbRequest2.result;
                                db.createObjectStore(_this.config['tableName'], { keyPath: 'cue' });
                                db.close();
                                resolve(true);
                            };
                        }
                        else {
                            dbRequest.result.close();
                            resolve(true);
                        }
                    };
                    dbRequest.onupgradeneeded = function (event) {
                        var db = dbRequest.result;
                        db.createObjectStore(_this.config['tableName'], { keyPath: 'cue' });
                        db.close();
                        resolve(true);
                    };
                });
            }
            storeInformation(information) {
                var _this = this;
                return new Promise((resolve, reject) => {
                    var indexedDB = window.indexedDB;
                    var dbRequest = indexedDB.open(_this.config['db']);
                    dbRequest.onsuccess = function (e) {
                        var db = dbRequest.result;
                        var request = db.transaction([_this.config['tableName']], "readwrite")
                            .objectStore(_this.config['tableName'])
                            .put(information);
                        request.onerror = function (event) {
                            resolve(false);
                        };
                        request.onsuccess = function (event) {
                            resolve(true);
                        };
                    };
                });
            }
            retrieveInformation(cue) {
                var _this = this;
                return new Promise((resolve, reject) => {
                    var indexedDB = window.indexedDB;
                    var dbRequest = indexedDB.open(_this.config['db']);
                    dbRequest.onsuccess = function (e) {
                        var db = dbRequest.result;
                        var request = db.transaction([_this.config['tableName']])
                            .objectStore(_this.config['tableName'])
                            .get(cue);
                        request.onerror = function (event) {
                            reject(null);
                        };
                        request.onsuccess = function (event) {
                            if (request.result) {
                                resolve(new memory.BasicMemoryUnity(request.result.cue, request.result.information));
                            }
                            else {
                                resolve(null);
                            }
                        };
                    };
                });
            }
            forgetInformation(cue) {
                var _this = this;
                return new Promise((resolve, reject) => {
                    var indexedDB = window.indexedDB;
                    var dbRequest = indexedDB.open(_this.config['db']);
                    dbRequest.onsuccess = function (e) {
                        var db = dbRequest.result;
                        var request = db.transaction([_this.config['tableName']], "readwrite")
                            .objectStore(_this.config['tableName'])
                            .delete(cue);
                        request.onerror = function (event) {
                            resolve(false);
                        };
                        request.onsuccess = function (event) {
                            resolve(true);
                        };
                    };
                });
            }
        }
        memory.MemoryDriverIndexDB = MemoryDriverIndexDB;
    })(memory = carina.memory || (carina.memory = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var memory;
    (function (memory) {
        class PerceptualMemory extends memory.Memory {
            constructor(driver) {
                super(driver);
            }
            static init(driver) {
                if (this._instance == null) {
                    this._instance = new PerceptualMemory(driver);
                }
            }
            static get instance() {
                return this._instance;
            }
        }
        PerceptualMemory._instance = null;
        memory.PerceptualMemory = PerceptualMemory;
    })(memory = carina.memory || (carina.memory = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var RootElement = carina.metacore.RootElement;
        class AgentSettings extends RootElement {
        }
        objectlevel.AgentSettings = AgentSettings;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var RootElement = carina.metacore.RootElement;
        class Actuator extends RootElement {
        }
        objectlevel.Actuator = Actuator;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var RootElement = carina.metacore.RootElement;
        class Pattern extends RootElement {
            constructor(pattern) {
                super();
                this.pattern = pattern ? pattern : null;
            }
            get pattern() {
                return this._pattern;
            }
            set pattern(pattern) {
                this._pattern = pattern;
            }
        }
        objectlevel.Pattern = Pattern;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var RootElement = carina.metacore.RootElement;
        class Category extends RootElement {
            constructor(category) {
                super();
                this.category = category ? category : null;
            }
            get category() {
                return this._category;
            }
            set category(category) {
                this._category = category;
            }
        }
        objectlevel.Category = Category;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var RootElement = carina.metacore.RootElement;
        class Input extends RootElement {
            constructor(information, type) {
                super();
                this.information = information ? information : null;
                this.type = type ? type : null;
            }
            get information() {
                return this._information;
            }
            set information(information) {
                this._information = information;
            }
            get type() {
                return this._type;
            }
            set type(type) {
                this._type = type;
            }
        }
        objectlevel.Input = Input;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var CognitiveFunction = carina.metacore.CognitiveFunction;
        var WorkingMemory = carina.memory.WorkingMemory;
        class Planning extends CognitiveFunction {
            processInformation(value) {
                return this.processInformationComputationalStrategy(value);
            }
            processInformationComputationalStrategy(value) {
                var bcpu = WorkingMemory.instance.bcpu;
                var categories = bcpu.categorys;
                var algorithmStrategy = new value(categories);
                var plans = algorithmStrategy.run();
                bcpu.addPlans(plans);
                WorkingMemory.instance.bcpu = bcpu;
                WorkingMemory.instance.updateMentalState("is_planned", (plans != null && plans.length > 0));
                return plans;
            }
            executePlans() {
                var bcpu = WorkingMemory.instance.bcpu;
                var plans = bcpu.plans;
                var categories = bcpu.categorys;
                for (var category of categories) {
                    plans[category.category].executePlan();
                }
                return null;
            }
        }
        objectlevel.Planning = Planning;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var CognitiveFunction = carina.metacore.CognitiveFunction;
        var WorkingMemory = carina.memory.WorkingMemory;
        var LongTermMemory = carina.memory.LongTermMemory;
        class Categorization extends CognitiveFunction {
            processInformation(value) {
                return this.processInformationComputationalStrategy(value);
            }
            processInformationComputationalStrategy(value) {
                var workingMemory = WorkingMemory.instance;
                var bcpu = workingMemory.bcpu;
                return new Promise((resolve) => {
                    this.getCategories().then((result) => {
                        var categories = result;
                        var algorithmStrategy = new value(categories);
                        var categorization = algorithmStrategy.run();
                        bcpu.addCategories(categorization);
                        workingMemory.bcpu = bcpu;
                        workingMemory.updateMentalState("is_categorized", (categorization != null && categorization.length > 0));
                        resolve(categorization);
                    });
                });
            }
            getCategories() {
                return new Promise((resolve, reject) => {
                    LongTermMemory.instance.retrieveInformation("categories").then((result) => {
                        var mem = result;
                        resolve(mem == null ? null : (mem.information));
                    });
                });
            }
        }
        objectlevel.Categorization = Categorization;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var Task = carina.metacore.Task;
        class CognitiveTask extends Task {
        }
        objectlevel.CognitiveTask = CognitiveTask;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var Event = carina.metacore.Event;
        class MemoryEvent extends Event {
        }
        objectlevel.MemoryEvent = MemoryEvent;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var Sensor = carina.metacore.Sensor;
        class MouseSensor extends Sensor {
            constructor() {
                super();
                this.type = 'mouse';
            }
        }
        objectlevel.MouseSensor = MouseSensor;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var CognitiveFunction = carina.metacore.CognitiveFunction;
        var WorkingMemory = carina.memory.WorkingMemory;
        class Perception extends CognitiveFunction {
            processInformation(value) {
                this.processInformationObject(value);
                return null;
            }
            processInformationObject(value) {
                var bcpu = WorkingMemory.instance.bcpu;
                bcpu.addInput(new objectlevel.Input(value["information"], value["type_sensor"]));
                this.perception = bcpu;
                WorkingMemory.instance.updateMentalState("is_perceived", true);
                WorkingMemory.instance.bcpu = bcpu;
            }
            get perception() {
                return this._perception;
            }
            set perception(perception) {
                this._perception = perception;
            }
        }
        objectlevel.Perception = Perception;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var Event = carina.metacore.Event;
        class ReasoningEvent extends Event {
            get profile() {
                return this._profile;
            }
            set profile(profile) {
                this._profile = profile;
            }
        }
        objectlevel.ReasoningEvent = ReasoningEvent;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        class ReasoningTask extends objectlevel.CognitiveTask {
            buildProfile() {
            }
            run() {
            }
            get strategys() {
                return this._strategys;
            }
            set strategys(strategys) {
                this._strategys = strategys;
            }
            addStrategy(strategy) {
                this._strategys.push(strategy);
            }
            getStrategy(pos) {
                return pos < this._strategys.length ? this._strategys[pos] : null;
            }
        }
        objectlevel.ReasoningTask = ReasoningTask;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var objectlevel;
    (function (objectlevel) {
        var CognitiveFunction = carina.metacore.CognitiveFunction;
        var WorkingMemory = carina.memory.WorkingMemory;
        var BasicMemoryUnity = carina.memory.BasicMemoryUnity;
        var LongTermMemory = carina.memory.LongTermMemory;
        var PerceptualMemory = carina.memory.PerceptualMemory;
        class Recognition extends CognitiveFunction {
            processInformation(value) {
                return this.processInformationComputationalStrategy(value);
            }
            processInformationComputationalStrategy(value) {
                return new Promise((resolve, reject) => {
                    var workingMemory = WorkingMemory.instance;
                    var bcpu = workingMemory.bcpu;
                    var inputs = bcpu.inputs;
                    this.checkText().then((result) => {
                        var recognition = result;
                        var information;
                        var data = [];
                        var keys = Object.keys(inputs);
                        for (var key of keys) {
                            information = inputs[key].information;
                            data.push({ "value": information });
                            data.push({ "recognized": recognition });
                        }
                        var mi = new BasicMemoryUnity("recognitionData", data);
                        PerceptualMemory.instance.storeInformation(mi);
                        bcpu.addPattern(recognition);
                        workingMemory.bcpu = bcpu;
                        resolve(recognition);
                    });
                });
            }
            checkText() {
                var workingMemory = WorkingMemory.instance;
                var bcpu = workingMemory.bcpu;
                var inputs = bcpu.inputs;
                return new Promise((resolve, reject) => {
                    LongTermMemory.instance.retrieveInformation("patterns").then((result) => {
                        var bmu = result;
                        var patterns = bmu.information;
                        var information;
                        var keys = Object.keys(inputs);
                        for (var key of keys) {
                            information = inputs[key].information;
                            for (var pattern of patterns) {
                                var strPattern = pattern.pattern;
                                var strInfo = information.information;
                                var regExp = new RegExp(strPattern);
                                if (regExp.test(strInfo)) {
                                    resolve(true);
                                }
                            }
                        }
                        resolve(false);
                    });
                });
            }
        }
        objectlevel.Recognition = Recognition;
    })(objectlevel = carina.objectlevel || (carina.objectlevel = {}));
})(carina || (carina = {}));
var carina;
(function (carina) {
    var modeloftheself;
    (function (modeloftheself) {
        class ModelOfTheSelf {
            constructorf() {
            }
            static get modelOfTheSelf() {
                if (this._modelOfTheSelf == null) {
                    this._modelOfTheSelf = new ModelOfTheSelf();
                }
                return this._modelOfTheSelf;
            }
            get profiles() {
                return this._profiles;
            }
            set profiles(profiles) {
                this._profiles = profiles;
            }
            getProfile(i) {
                return this._profiles[i];
            }
            addProfile(profile, i) {
                if (this.profiles.length < i) {
                    this.profiles.push(profile);
                }
                else {
                    this.profiles[i] = profile;
                }
            }
            get events() {
                return this._events;
            }
            set events(events) {
                this._events = events;
            }
            getEvent(i) {
                return this._events[i];
            }
            addEvent(event, i) {
                if (this._events.length < i) {
                    this.events.push(event);
                }
                else {
                    this.events[i] = event;
                }
            }
            get knownCognitiveFunctions() {
                if (this._knownCognitiveFunctions == null) {
                    this._knownCognitiveFunctions = [];
                }
                return this._knownCognitiveFunctions;
            }
        }
        modeloftheself.ModelOfTheSelf = ModelOfTheSelf;
    })(modeloftheself = carina.modeloftheself || (carina.modeloftheself = {}));
})(carina || (carina = {}));
