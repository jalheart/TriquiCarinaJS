System.register("metacore/RootElement", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RootElement;
    return {
        setters:[],
        execute: function() {
            RootElement = class RootElement {
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
            };
            exports_1("RootElement", RootElement);
        }
    }
});
System.register("metacore/Element", ["metacore/RootElement"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var RootElement_1;
    var Element;
    return {
        setters:[
            function (RootElement_1_1) {
                RootElement_1 = RootElement_1_1;
            }],
        execute: function() {
            Element = class Element extends RootElement_1.RootElement {
            };
            exports_2("Element", Element);
        }
    }
});
System.register("metacore/Event", ["metacore/Element"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var Element_1;
    var Event;
    return {
        setters:[
            function (Element_1_1) {
                Element_1 = Element_1_1;
            }],
        execute: function() {
            Event = class Event extends Element_1.Element {
                constructor(name) {
                    super();
                    this.name = name;
                }
            };
            exports_3("Event", Event);
        }
    }
});
System.register("metacore/CognitiveFunction", ["metacore/Element"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var Element_2;
    var CognitiveFunction;
    return {
        setters:[
            function (Element_2_1) {
                Element_2 = Element_2_1;
            }],
        execute: function() {
            CognitiveFunction = class CognitiveFunction extends Element_2.Element {
            };
            exports_4("CognitiveFunction", CognitiveFunction);
        }
    }
});
System.register("metacore/EstructureElement", ["metacore/RootElement"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var RootElement_2;
    var EstructureElement;
    return {
        setters:[
            function (RootElement_2_1) {
                RootElement_2 = RootElement_2_1;
            }],
        execute: function() {
            EstructureElement = class EstructureElement extends RootElement_2.RootElement {
            };
            exports_5("EstructureElement", EstructureElement);
        }
    }
});
System.register("metacore/Field", ["metacore/RootElement"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var RootElement_3;
    var Field;
    return {
        setters:[
            function (RootElement_3_1) {
                RootElement_3 = RootElement_3_1;
            }],
        execute: function() {
            Field = class Field extends RootElement_3.RootElement {
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
            };
            exports_6("Field", Field);
        }
    }
});
System.register("metacore/Profile", ["metacore/RootElement"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var RootElement_4;
    var Profile;
    return {
        setters:[
            function (RootElement_4_1) {
                RootElement_4 = RootElement_4_1;
            }],
        execute: function() {
            Profile = class Profile extends RootElement_4.RootElement {
            };
            exports_7("Profile", Profile);
        }
    }
});
System.register("metacore/ReasoningTaskProfile", ["metacore/Profile", "metacore/Field"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var Profile_1, Field_1;
    var ReasoningTaskProfile;
    return {
        setters:[
            function (Profile_1_1) {
                Profile_1 = Profile_1_1;
            },
            function (Field_1_1) {
                Field_1 = Field_1_1;
            }],
        execute: function() {
            ReasoningTaskProfile = class ReasoningTaskProfile extends Profile_1.Profile {
                ReasoningTaskProfile(fields) {
                    this._fields = [];
                    for (let field of fields) {
                        this.setField(field.name, field.value);
                    }
                }
                setField(name, value) {
                    this._fields.push(new Field_1.Field(name, value));
                }
            };
            exports_8("ReasoningTaskProfile", ReasoningTaskProfile);
        }
    }
});
System.register("metacore/State", ["metacore/Element"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var Element_3;
    var State;
    return {
        setters:[
            function (Element_3_1) {
                Element_3 = Element_3_1;
            }],
        execute: function() {
            State = class State extends Element_3.Element {
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
            };
            exports_9("State", State);
        }
    }
});
System.register("metacore/FuntionalElement", ["metacore/RootElement"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var RootElement_5;
    var FuntionalElement;
    return {
        setters:[
            function (RootElement_5_1) {
                RootElement_5 = RootElement_5_1;
            }],
        execute: function() {
            FuntionalElement = class FuntionalElement extends RootElement_5.RootElement {
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
            };
            exports_10("FuntionalElement", FuntionalElement);
        }
    }
});
System.register("metacore/Goal", ["metacore/Element"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var Element_4;
    var Goal;
    return {
        setters:[
            function (Element_4_1) {
                Element_4 = Element_4_1;
            }],
        execute: function() {
            Goal = class Goal extends Element_4.Element {
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
            };
            exports_11("Goal", Goal);
        }
    }
});
System.register("metacore/Task", ["metacore/FuntionalElement"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var FuntionalElement_1;
    var Task;
    return {
        setters:[
            function (FuntionalElement_1_1) {
                FuntionalElement_1 = FuntionalElement_1_1;
            }],
        execute: function() {
            Task = class Task extends FuntionalElement_1.FuntionalElement {
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
            };
            exports_12("Task", Task);
        }
    }
});
System.register("metacore/Action", ["metacore/Task"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var Task_1;
    var Action;
    return {
        setters:[
            function (Task_1_1) {
                Task_1 = Task_1_1;
            }],
        execute: function() {
            Action = class Action extends Task_1.Task {
            };
            exports_13("Action", Action);
        }
    }
});
System.register("metacore/Strategy", ["metacore/FuntionalElement"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var FuntionalElement_2;
    var Strategy;
    return {
        setters:[
            function (FuntionalElement_2_1) {
                FuntionalElement_2 = FuntionalElement_2_1;
            }],
        execute: function() {
            Strategy = class Strategy extends FuntionalElement_2.FuntionalElement {
            };
            exports_14("Strategy", Strategy);
        }
    }
});
System.register("metacore/ComputationalStrategy", ["metacore/Strategy"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var Strategy_1;
    var ComputationalStrategy;
    return {
        setters:[
            function (Strategy_1_1) {
                Strategy_1 = Strategy_1_1;
            }],
        execute: function() {
            ComputationalStrategy = class ComputationalStrategy extends Strategy_1.Strategy {
            };
            exports_15("ComputationalStrategy", ComputationalStrategy);
        }
    }
});
System.register("metacore/Plan", ["metacore/Element"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var Element_5;
    var Plan;
    return {
        setters:[
            function (Element_5_1) {
                Element_5 = Element_5_1;
            }],
        execute: function() {
            Plan = class Plan extends Element_5.Element {
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
            };
            exports_16("Plan", Plan);
        }
    }
});
System.register("memory/BasicMemoryUnity", [], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var BasicMemoryUnity;
    return {
        setters:[],
        execute: function() {
            BasicMemoryUnity = class BasicMemoryUnity {
                constructor(cue, information) {
                    this.cue = cue;
                    this.information = information;
                }
            };
            exports_17("BasicMemoryUnity", BasicMemoryUnity);
        }
    }
});
System.register("memory/MemoryDriver", [], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var MemoryDriver;
    return {
        setters:[],
        execute: function() {
            MemoryDriver = class MemoryDriver {
                constructor(config) {
                    this.config = config;
                }
                get config() {
                    return this._config;
                }
                set config(config) {
                    this._config = config;
                }
            };
            exports_18("MemoryDriver", MemoryDriver);
        }
    }
});
System.register("memory/Memory", [], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var Memory;
    return {
        setters:[],
        execute: function() {
            Memory = class Memory {
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
            };
            exports_19("Memory", Memory);
        }
    }
});
System.register("memory/LongTermMemory", ["memory/Memory"], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var Memory_1;
    var LongTermMemory;
    return {
        setters:[
            function (Memory_1_1) {
                Memory_1 = Memory_1_1;
            }],
        execute: function() {
            LongTermMemory = class LongTermMemory extends Memory_1.Memory {
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
            };
            LongTermMemory._instance = null;
            exports_20("LongTermMemory", LongTermMemory);
        }
    }
});
System.register("memory/SensorMemory", ["memory/Memory"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var Memory_2;
    var SensorMemory;
    return {
        setters:[
            function (Memory_2_1) {
                Memory_2 = Memory_2_1;
            }],
        execute: function() {
            SensorMemory = class SensorMemory extends Memory_2.Memory {
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
            };
            exports_21("SensorMemory", SensorMemory);
        }
    }
});
System.register("metacore/Sensor", ["memory/SensorMemory", "metacore/RootElement"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var SensorMemory_1, RootElement_6;
    var Sensor;
    return {
        setters:[
            function (SensorMemory_1_1) {
                SensorMemory_1 = SensorMemory_1_1;
            },
            function (RootElement_6_1) {
                RootElement_6 = RootElement_6_1;
            }],
        execute: function() {
            Sensor = class Sensor extends RootElement_6.RootElement {
                constructor() {
                    super();
                    this._sensorMemory = SensorMemory_1.SensorMemory.instance;
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
            };
            exports_22("Sensor", Sensor);
        }
    }
});
System.register("objectlevel/Input", ["metacore/RootElement"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var RootElement_7;
    var Input;
    return {
        setters:[
            function (RootElement_7_1) {
                RootElement_7 = RootElement_7_1;
            }],
        execute: function() {
            Input = class Input extends RootElement_7.RootElement {
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
            };
            exports_23("Input", Input);
        }
    }
});
System.register("objectlevel/Pattern", ["metacore/RootElement"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var RootElement_8;
    var Pattern;
    return {
        setters:[
            function (RootElement_8_1) {
                RootElement_8 = RootElement_8_1;
            }],
        execute: function() {
            Pattern = class Pattern extends RootElement_8.RootElement {
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
            };
            exports_24("Pattern", Pattern);
        }
    }
});
System.register("objectlevel/Category", ["metacore/RootElement"], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var RootElement_9;
    var Category;
    return {
        setters:[
            function (RootElement_9_1) {
                RootElement_9 = RootElement_9_1;
            }],
        execute: function() {
            Category = class Category extends RootElement_9.RootElement {
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
            };
            exports_25("Category", Category);
        }
    }
});
System.register("objectlevel/BasicCognitiveProcessingUnit", ["metacore/RootElement", "objectlevel/Input", "objectlevel/Pattern", "objectlevel/Category"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var RootElement_10, Input_1, Pattern_1, Category_1;
    var BasicCognitiveProcessingUnit;
    return {
        setters:[
            function (RootElement_10_1) {
                RootElement_10 = RootElement_10_1;
            },
            function (Input_1_1) {
                Input_1 = Input_1_1;
            },
            function (Pattern_1_1) {
                Pattern_1 = Pattern_1_1;
            },
            function (Category_1_1) {
                Category_1 = Category_1_1;
            }],
        execute: function() {
            BasicCognitiveProcessingUnit = class BasicCognitiveProcessingUnit extends RootElement_10.RootElement {
                addInput(input, typeSensor) {
                    if (typeof input === "Input") {
                        this.input = input;
                    }
                    else {
                        var newInput = new Input_1.Input();
                        newInput.information = input;
                        newInput.type = typeSensor;
                        this.input = newInput;
                    }
                }
                addPattern(pattern) {
                    var newPattern = new Pattern_1.Pattern(pattern);
                    this.pattern = newPattern;
                }
                addCategories(categories) {
                    if (categories != null) {
                        var categorysTemp = [];
                        var newCategory;
                        for (var category of categories) {
                            newCategory = new Category_1.Category();
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
            };
            exports_26("BasicCognitiveProcessingUnit", BasicCognitiveProcessingUnit);
        }
    }
});
System.register("memory/WorkingMemory", ["memory/Memory", "memory/BasicMemoryUnity"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var Memory_3, BasicMemoryUnity_1;
    var WorkingMemory;
    return {
        setters:[
            function (Memory_3_1) {
                Memory_3 = Memory_3_1;
            },
            function (BasicMemoryUnity_1_1) {
                BasicMemoryUnity_1 = BasicMemoryUnity_1_1;
            }],
        execute: function() {
            WorkingMemory = class WorkingMemory extends Memory_3.Memory {
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
                        this.driver.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("profiles", this.profiles));
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
                            this.driver.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("mental_state", this.mentalStates)).then((result) => {
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
                    this.driver.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("bcpu", value));
                }
                syncModelOfTheWorld(value) {
                    this.driver.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity("model_of_the_world", value));
                }
            };
            exports_27("WorkingMemory", WorkingMemory);
        }
    }
});
System.register("objectlevel/ModelOfTheWorld", ["memory/WorkingMemory"], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var WorkingMemory_1;
    var ModelOfTheWorld;
    return {
        setters:[
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            }],
        execute: function() {
            ModelOfTheWorld = class ModelOfTheWorld {
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
                        WorkingMemory_1.WorkingMemory.instance.retrieveInformation("is_created").then((result) => {
                            var isCreated = result;
                            resolve(isCreated != null ? isCreated.information : this._isCreated);
                        });
                    });
                }
                set stateIsCreated(isCreated) {
                    this._isCreated = isCreated;
                }
            };
            exports_28("ModelOfTheWorld", ModelOfTheWorld);
        }
    }
});
System.register("memory/MemoryDriverIndexDB", ["memory/MemoryDriver", "memory/BasicMemoryUnity"], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var MemoryDriver_1, BasicMemoryUnity_2;
    var MemoryDriverIndexDB;
    return {
        setters:[
            function (MemoryDriver_1_1) {
                MemoryDriver_1 = MemoryDriver_1_1;
            },
            function (BasicMemoryUnity_2_1) {
                BasicMemoryUnity_2 = BasicMemoryUnity_2_1;
            }],
        execute: function() {
            MemoryDriverIndexDB = class MemoryDriverIndexDB extends MemoryDriver_1.MemoryDriver {
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
                                    resolve(new BasicMemoryUnity_2.BasicMemoryUnity(request.result.cue, request.result.information));
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
            };
            exports_29("MemoryDriverIndexDB", MemoryDriverIndexDB);
        }
    }
});
System.register("memory/PerceptualMemory", ["memory/Memory"], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var Memory_4;
    var PerceptualMemory;
    return {
        setters:[
            function (Memory_4_1) {
                Memory_4 = Memory_4_1;
            }],
        execute: function() {
            PerceptualMemory = class PerceptualMemory extends Memory_4.Memory {
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
            };
            PerceptualMemory._instance = null;
            exports_30("PerceptualMemory", PerceptualMemory);
        }
    }
});
System.register("objectlevel/AgentSettings", ["metacore/RootElement"], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var RootElement_11;
    var AgentSettings;
    return {
        setters:[
            function (RootElement_11_1) {
                RootElement_11 = RootElement_11_1;
            }],
        execute: function() {
            AgentSettings = class AgentSettings extends RootElement_11.RootElement {
            };
            exports_31("AgentSettings", AgentSettings);
        }
    }
});
System.register("objectlevel/Actuator", ["metacore/RootElement"], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var RootElement_12;
    var Actuator;
    return {
        setters:[
            function (RootElement_12_1) {
                RootElement_12 = RootElement_12_1;
            }],
        execute: function() {
            Actuator = class Actuator extends RootElement_12.RootElement {
            };
            exports_32("Actuator", Actuator);
        }
    }
});
System.register("objectlevel/Planning", ["metacore/CognitiveFunction", "memory/WorkingMemory"], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var CognitiveFunction_1, WorkingMemory_2;
    var Planning;
    return {
        setters:[
            function (CognitiveFunction_1_1) {
                CognitiveFunction_1 = CognitiveFunction_1_1;
            },
            function (WorkingMemory_2_1) {
                WorkingMemory_2 = WorkingMemory_2_1;
            }],
        execute: function() {
            Planning = class Planning extends CognitiveFunction_1.CognitiveFunction {
                processInformation(value) {
                    return this.processInformationComputationalStrategy(value);
                }
                processInformationComputationalStrategy(value) {
                    var bcpu = WorkingMemory_2.WorkingMemory.instance.bcpu;
                    var categories = bcpu.categorys;
                    var algorithmStrategy = new value(categories);
                    var plans = algorithmStrategy.run();
                    bcpu.addPlans(plans);
                    WorkingMemory_2.WorkingMemory.instance.bcpu = bcpu;
                    WorkingMemory_2.WorkingMemory.instance.updateMentalState("is_planned", (plans != null && plans.length > 0));
                    return plans;
                }
                executePlans() {
                    var bcpu = WorkingMemory_2.WorkingMemory.instance.bcpu;
                    var plans = bcpu.plans;
                    var categories = bcpu.categorys;
                    for (var category of categories) {
                        plans[category.category].executePlan();
                    }
                    return null;
                }
            };
            exports_33("Planning", Planning);
        }
    }
});
System.register("objectlevel/Categorization", ["metacore/CognitiveFunction", "memory/WorkingMemory", "memory/LongTermMemory"], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var CognitiveFunction_2, WorkingMemory_3, LongTermMemory_1;
    var Categorization;
    return {
        setters:[
            function (CognitiveFunction_2_1) {
                CognitiveFunction_2 = CognitiveFunction_2_1;
            },
            function (WorkingMemory_3_1) {
                WorkingMemory_3 = WorkingMemory_3_1;
            },
            function (LongTermMemory_1_1) {
                LongTermMemory_1 = LongTermMemory_1_1;
            }],
        execute: function() {
            Categorization = class Categorization extends CognitiveFunction_2.CognitiveFunction {
                processInformation(value) {
                    return this.processInformationComputationalStrategy(value);
                }
                processInformationComputationalStrategy(value) {
                    var workingMemory = WorkingMemory_3.WorkingMemory.instance;
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
                        LongTermMemory_1.LongTermMemory.instance.retrieveInformation("categories").then((result) => {
                            var mem = result;
                            resolve(mem == null ? null : (mem.information));
                        });
                    });
                }
            };
            exports_34("Categorization", Categorization);
        }
    }
});
System.register("objectlevel/CognitiveTask", ["metacore/Task"], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var Task_2;
    var CognitiveTask;
    return {
        setters:[
            function (Task_2_1) {
                Task_2 = Task_2_1;
            }],
        execute: function() {
            CognitiveTask = class CognitiveTask extends Task_2.Task {
            };
            exports_35("CognitiveTask", CognitiveTask);
        }
    }
});
System.register("objectlevel/MemoryEvent", ["metacore/Event"], function(exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var Event_1;
    var MemoryEvent;
    return {
        setters:[
            function (Event_1_1) {
                Event_1 = Event_1_1;
            }],
        execute: function() {
            MemoryEvent = class MemoryEvent extends Event_1.Event {
            };
            exports_36("MemoryEvent", MemoryEvent);
        }
    }
});
System.register("objectlevel/MouseSensor", ["metacore/Sensor"], function(exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var Sensor_1;
    var MouseSensor;
    return {
        setters:[
            function (Sensor_1_1) {
                Sensor_1 = Sensor_1_1;
            }],
        execute: function() {
            MouseSensor = class MouseSensor extends Sensor_1.Sensor {
                constructor() {
                    super();
                    this.type = 'mouse';
                }
            };
            exports_37("MouseSensor", MouseSensor);
        }
    }
});
System.register("objectlevel/Perception", ["metacore/CognitiveFunction", "memory/WorkingMemory", "objectlevel/Input"], function(exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var CognitiveFunction_3, WorkingMemory_4, Input_2;
    var Perception;
    return {
        setters:[
            function (CognitiveFunction_3_1) {
                CognitiveFunction_3 = CognitiveFunction_3_1;
            },
            function (WorkingMemory_4_1) {
                WorkingMemory_4 = WorkingMemory_4_1;
            },
            function (Input_2_1) {
                Input_2 = Input_2_1;
            }],
        execute: function() {
            Perception = class Perception extends CognitiveFunction_3.CognitiveFunction {
                processInformation(value) {
                    this.processInformationObject(value);
                    return null;
                }
                processInformationObject(value) {
                    var bcpu = WorkingMemory_4.WorkingMemory.instance.bcpu;
                    bcpu.addInput(new Input_2.Input(value["information"], value["type_sensor"]));
                    this.perception = bcpu;
                    WorkingMemory_4.WorkingMemory.instance.updateMentalState("is_perceived", true);
                    WorkingMemory_4.WorkingMemory.instance.bcpu = bcpu;
                }
                get perception() {
                    return this._perception;
                }
                set perception(perception) {
                    this._perception = perception;
                }
            };
            exports_38("Perception", Perception);
        }
    }
});
System.register("objectlevel/ReasoningEvent", ["metacore/Event"], function(exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var Event_2;
    var ReasoningEvent;
    return {
        setters:[
            function (Event_2_1) {
                Event_2 = Event_2_1;
            }],
        execute: function() {
            ReasoningEvent = class ReasoningEvent extends Event_2.Event {
                get profile() {
                    return this._profile;
                }
                set profile(profile) {
                    this._profile = profile;
                }
            };
            exports_39("ReasoningEvent", ReasoningEvent);
        }
    }
});
System.register("objectlevel/ReasoningTask", ["objectlevel/CognitiveTask"], function(exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var CognitiveTask_1;
    var ReasoningTask;
    return {
        setters:[
            function (CognitiveTask_1_1) {
                CognitiveTask_1 = CognitiveTask_1_1;
            }],
        execute: function() {
            ReasoningTask = class ReasoningTask extends CognitiveTask_1.CognitiveTask {
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
            };
            exports_40("ReasoningTask", ReasoningTask);
        }
    }
});
System.register("objectlevel/Recognition", ["metacore/CognitiveFunction", "memory/WorkingMemory", "memory/BasicMemoryUnity", "memory/LongTermMemory", "memory/PerceptualMemory"], function(exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var CognitiveFunction_4, WorkingMemory_5, BasicMemoryUnity_3, LongTermMemory_2, PerceptualMemory_1;
    var Recognition;
    return {
        setters:[
            function (CognitiveFunction_4_1) {
                CognitiveFunction_4 = CognitiveFunction_4_1;
            },
            function (WorkingMemory_5_1) {
                WorkingMemory_5 = WorkingMemory_5_1;
            },
            function (BasicMemoryUnity_3_1) {
                BasicMemoryUnity_3 = BasicMemoryUnity_3_1;
            },
            function (LongTermMemory_2_1) {
                LongTermMemory_2 = LongTermMemory_2_1;
            },
            function (PerceptualMemory_1_1) {
                PerceptualMemory_1 = PerceptualMemory_1_1;
            }],
        execute: function() {
            Recognition = class Recognition extends CognitiveFunction_4.CognitiveFunction {
                processInformation(value) {
                    return this.processInformationComputationalStrategy(value);
                }
                processInformationComputationalStrategy(value) {
                    return new Promise((resolve, reject) => {
                        var workingMemory = WorkingMemory_5.WorkingMemory.instance;
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
                            var mi = new BasicMemoryUnity_3.BasicMemoryUnity("recognitionData", data);
                            PerceptualMemory_1.PerceptualMemory.instance.storeInformation(mi);
                            bcpu.addPattern(recognition);
                            workingMemory.bcpu = bcpu;
                            resolve(recognition);
                        });
                    });
                }
                checkText() {
                    var workingMemory = WorkingMemory_5.WorkingMemory.instance;
                    var bcpu = workingMemory.bcpu;
                    var inputs = bcpu.inputs;
                    return new Promise((resolve, reject) => {
                        LongTermMemory_2.LongTermMemory.instance.retrieveInformation("patterns").then((result) => {
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
            };
            exports_41("Recognition", Recognition);
        }
    }
});
System.register("modeloftheself/ModelOfTheSelf", [], function(exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var ModelOfTheSelf;
    return {
        setters:[],
        execute: function() {
            ModelOfTheSelf = class ModelOfTheSelf {
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
            };
            exports_42("ModelOfTheSelf", ModelOfTheSelf);
        }
    }
});
