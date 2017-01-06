System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MouseSensor, BasicMemoryUnity, PlayerMovement;
    return {
        setters:[],
        execute: function() {
            MouseSensor = carina.objectlevel.MouseSensor;
            BasicMemoryUnity = carina.memory.BasicMemoryUnity;
            class PlayerMovement extends MouseSensor {
                constructor() {
                    super();
                }
                set movement(value) {
                    this.sensorMemory.storeInformation(new BasicMemoryUnity(this.type, value));
                }
                get movement() {
                    return this.sensorMemory.retrieveInformation(this.type);
                }
            }
            exports_1("PlayerMovement", PlayerMovement);
        }
    }
});
