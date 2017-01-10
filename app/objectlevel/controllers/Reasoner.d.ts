import { Sensor } from '../../../libs/carina/metacore/Sensor';
/**
 * Se encarga de realizar el proceso de razonamiento del triqui
 */
export declare class Reasoner {
    private _workingMemory;
    private _perception;
    private _playerMovement;
    private _resetButton;
    private _recognition;
    private _categorization;
    private _planning;
    private _plans;
    private _inputs;
    private _output;
    constructor(inputs?: string[][], output?: any);
    initSensors(): void;
    sensing: (sensor: Sensor) => void;
    /**
     * Se encarga de la percepción del agente, se llega aquí despues de que un sensor se ha disparado
     */
    cicloCognitivo(sensor?: Sensor): void;
    perception(sensor: Sensor): Promise<boolean>;
    recognition(): Promise<boolean>;
    categorization(): Promise<boolean>;
    planning(): Promise<any>;
    run(plans: any): Promise<boolean>;
    showBoard(): Promise<any>;
}
