System.register(['../metacore/CognitiveFunction', '../memory/WorkingMemory', '../memory/BasicMemoryUnity', '../memory/LongTermMemory', '../memory/PerceptualMemory'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CognitiveFunction_1, WorkingMemory_1, BasicMemoryUnity_1, LongTermMemory_1, PerceptualMemory_1;
    var Recognition;
    return {
        setters:[
            function (CognitiveFunction_1_1) {
                CognitiveFunction_1 = CognitiveFunction_1_1;
            },
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            },
            function (BasicMemoryUnity_1_1) {
                BasicMemoryUnity_1 = BasicMemoryUnity_1_1;
            },
            function (LongTermMemory_1_1) {
                LongTermMemory_1 = LongTermMemory_1_1;
            },
            function (PerceptualMemory_1_1) {
                PerceptualMemory_1 = PerceptualMemory_1_1;
            }],
        execute: function() {
            Recognition = class Recognition extends CognitiveFunction_1.CognitiveFunction {
                processInformation(value) {
                    return this.processInformationComputationalStrategy(value);
                }
                processInformationComputationalStrategy(value) {
                    return new Promise((resolve, reject) => {
                        var workingMemory = WorkingMemory_1.WorkingMemory.instance;
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
                            var mi = new BasicMemoryUnity_1.BasicMemoryUnity("recognitionData", data);
                            PerceptualMemory_1.PerceptualMemory.instance.storeInformation(mi);
                            bcpu.addPattern(recognition);
                            workingMemory.bcpu = bcpu;
                            resolve(recognition);
                        });
                    });
                }
                checkText() {
                    var workingMemory = WorkingMemory_1.WorkingMemory.instance;
                    var bcpu = workingMemory.bcpu;
                    var inputs = bcpu.inputs;
                    return new Promise((resolve, reject) => {
                        LongTermMemory_1.LongTermMemory.instance.retrieveInformation("patterns").then((result) => {
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
            exports_1("Recognition", Recognition);
        }
    }
});
