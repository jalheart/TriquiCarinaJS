System.register(['../../../libs/carina/objectlevel/MouseSensor', '../../../libs/carina/memory/BasicMemoryUnity'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MouseSensor_1, BasicMemoryUnity_1;
    var PlayerMovement;
    return {
        setters:[
            function (MouseSensor_1_1) {
                MouseSensor_1 = MouseSensor_1_1;
            },
            function (BasicMemoryUnity_1_1) {
                BasicMemoryUnity_1 = BasicMemoryUnity_1_1;
            }],
        execute: function() {
            PlayerMovement = class PlayerMovement extends MouseSensor_1.MouseSensor {
                constructor() {
                    super();
                    this.sensing = (e) => {
                        this._target = e.srcElement;
                        var pos = this._target.dataset['pos'];
                        this.sensorMemory.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity(this.type, pos)).then(() => {
                            this.dispatchAll('sensing');
                        });
                    };
                    this.type = 'player_move';
                    var sensors = document.getElementsByName('player_move');
                    var i;
                    var ob;
                    for (i = 0; i < sensors.length; i++) {
                        sensors[i].addEventListener('click', this.sensing);
                    }
                }
                set movement(value) {
                    this.sensorMemory.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity(this.type, value));
                }
                get movement() {
                    return this.sensorMemory.retrieveInformation(this.type);
                }
            };
            exports_1("PlayerMovement", PlayerMovement);
        }
    }
});
