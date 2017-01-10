System.register(["../../../libs/carina/objectlevel/MouseSensor", "../../../libs/carina/memory/BasicMemoryUnity"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MouseSensor_1, BasicMemoryUnity_1, ResetButton;
    return {
        setters: [
            function (MouseSensor_1_1) {
                MouseSensor_1 = MouseSensor_1_1;
            },
            function (BasicMemoryUnity_1_1) {
                BasicMemoryUnity_1 = BasicMemoryUnity_1_1;
            }
        ],
        execute: function () {
            ResetButton = class ResetButton extends MouseSensor_1.MouseSensor {
                constructor() {
                    super();
                    this.sensing = (e) => {
                        this._target = e.srcElement;
                        this.sensorMemory.storeInformation(new BasicMemoryUnity_1.BasicMemoryUnity(this.type, 'reset')).then(() => {
                            this.dispatchAll('sensing');
                        });
                    };
                    this.type = 'reset';
                    var sensor = document.getElementById('btn_reset');
                    sensor.addEventListener('click', this.sensing);
                }
            };
            exports_1("ResetButton", ResetButton);
        }
    };
});
