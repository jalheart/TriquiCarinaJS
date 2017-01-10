System.register(['../metacore/CognitiveFunction', '../memory/WorkingMemory'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CognitiveFunction_1, WorkingMemory_1;
    var Planning;
    return {
        setters:[
            function (CognitiveFunction_1_1) {
                CognitiveFunction_1 = CognitiveFunction_1_1;
            },
            function (WorkingMemory_1_1) {
                WorkingMemory_1 = WorkingMemory_1_1;
            }],
        execute: function() {
            Planning = class Planning extends CognitiveFunction_1.CognitiveFunction {
                processInformation(value) {
                    return this.processInformationComputationalStrategy(value);
                }
                processInformationComputationalStrategy(value) {
                    var bcpu = WorkingMemory_1.WorkingMemory.instance.bcpu;
                    var categories = bcpu.categorys;
                    var algorithmStrategy = new value(categories);
                    var plans = algorithmStrategy.run();
                    bcpu.addPlans(plans);
                    WorkingMemory_1.WorkingMemory.instance.bcpu = bcpu;
                    WorkingMemory_1.WorkingMemory.instance.updateMentalState("is_planned", (plans != null && plans.length > 0));
                    return plans;
                }
                executePlans() {
                    var bcpu = WorkingMemory_1.WorkingMemory.instance.bcpu;
                    var plans = bcpu.plans;
                    var categories = bcpu.categorys;
                    for (var category of categories) {
                        plans[category.category].executePlan();
                    }
                    return null;
                }
            };
            exports_1("Planning", Planning);
        }
    }
});
