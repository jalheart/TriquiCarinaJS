import { SensorMemory } from '../memory/SensorMemory';
import { RootElement } from './RootElement';
export declare abstract class Sensor extends RootElement {
    private _eventHandlers;
    private _type;
    private _sensorMemory;
    constructor();
    perceiveInformation(value: any): any;
    addEventListener(theEvent: string, theHandler: any): void;
    removeEventListener(theEvent: string, theHandler: any): void;
    removeAllListeners(theEvent: string): void;
    dispatchAll(theEvent: string): void;
    dispatchEvent(theEvent: string, theHandler: any): void;
    type: string;
    readonly sensorMemory: SensorMemory;
}
