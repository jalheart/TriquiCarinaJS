System.register(['../models/TriquiModelOfTheWorld'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TriquiModelOfTheWorld_1;
    var WorkingMemory, Perception, Recognition, Categorization, Planning, Plan, Reasoner;
    return {
        setters:[
            function (TriquiModelOfTheWorld_1_1) {
                TriquiModelOfTheWorld_1 = TriquiModelOfTheWorld_1_1;
            }],
        execute: function() {
            /**
             * Se encarga de realizar el proceso de razonamiento del triqui
             */
            class Reasoner {
                constructor(inputs, output) {
                    this._inputs = inputs;
                    this._output = output;
                    this._workingMemory = global.WorkingMemory.instance;
                    if (this._workingMemory.modelOfTheWorld == null) {
                        var modelOfTheWorld = new TriquiModelOfTheWorld_1.TriquiModelOfTheWorld();
                        modelOfTheWorld.addMission("win_game");
                        modelOfTheWorld.addTokens("O", "X");
                        this._workingMemory.modelOfTheWorld = modelOfTheWorld;
                    }
                    // this._playerMovement    =new PlayerMovement();
                    // this._recognition       =new Recognition();
                    // this._categorization    =new Categorization();
                    // this._perception        =new Perception();
                    // this._planning          =new Planning();
                    // this.plans  =new HashMap<>();
                }
            }
            exports_1("Reasoner", Reasoner);
        }
    }
});
