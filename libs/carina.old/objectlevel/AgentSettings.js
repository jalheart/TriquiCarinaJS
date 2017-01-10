System.register(['../metacore/RootElement'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RootElement_1;
    var AgentSettings;
    return {
        setters:[
            function (RootElement_1_1) {
                RootElement_1 = RootElement_1_1;
            }],
        execute: function() {
            AgentSettings = class AgentSettings extends RootElement_1.RootElement {
            };
            exports_1("AgentSettings", AgentSettings);
        }
    }
});
