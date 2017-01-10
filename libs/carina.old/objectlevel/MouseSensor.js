System.register(['../metacore/Sensor'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
            exports_1("MouseSensor", MouseSensor);
        }
    }
});
