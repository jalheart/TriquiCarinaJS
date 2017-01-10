System.register(['../metacore/CognitiveFunction', '../memory/WorkingMemory', '../memory/LongTermMemory'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CognitiveFunction_1, WorkingMemory_1, LongTermMemory_1;
    var Categorization;
    return {
        setters:[
            function (CognitiveFunction_1_1) {
                CognitiveFunction_1 = CognitiveFunction_1_1;
            },
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            },
            function (LongTermMemory_1_1) {
                LongTermMemory_1 = LongTermMemory_1_1;
            }],
        execute: function() {
            Categorization = class Categorization extends CognitiveFunction_1.CognitiveFunction {
                processInformation(value) {
                    return this.processInformationComputationalStrategy(value);
                }
                processInformationComputationalStrategy(value) {
                    var workingMemory = WorkingMemory_1.WorkingMemory.instance;
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
            exports_1("Categorization", Categorization);
        }
    }
});
