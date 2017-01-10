System.register(['../memory/SensorMemory', './RootElement'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SensorMemory_1, RootElement_1;
    var Sensor;
    return {
        setters:[
            function (SensorMemory_1_1) {
                SensorMemory_1 = SensorMemory_1_1;
            },
            function (RootElement_1_1) {
                RootElement_1 = RootElement_1_1;
            }],
        execute: function() {
            Sensor = class Sensor extends RootElement_1.RootElement {
                constructor() {
                    super();
                    this._eventHandlers = {};
                    this._sensorMemory = SensorMemory_1.SensorMemory.instance;
                }
                perceiveInformation(value) {
                    return null;
                }
                addEventListener(theEvent, theHandler) {
                    this._eventHandlers[theEvent] = this._eventHandlers[theEvent] || [];
                    this._eventHandlers[theEvent].push(theHandler);
                }
                removeEventListener(theEvent, theHandler) {
                }
                removeAllListeners(theEvent) {
                }
                dispatchAll(theEvent) {
                    var theHandlers = this._eventHandlers[theEvent];
                    if (theHandlers) {
                        for (var i = 0; i < theHandlers.length; i += 1) {
                            this.dispatchEvent(theEvent, theHandlers[i]);
                        }
                    }
                }
                dispatchEvent(theEvent, theHandler) {
                    theHandler(this);
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
            exports_1("Sensor", Sensor);
        }
    }
});
